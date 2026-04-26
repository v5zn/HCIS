import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

function loadEnvFile(filename) {
  const filePath = path.join(projectRoot, filename);

  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const port = Number(process.env.CHAT_API_PORT || 8787);
const geminiApiKey = process.env.GEMINI_API_KEY;

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(payload));
}

function logChatEvent(message, details) {
  const timestamp = new Date().toISOString();

  if (details) {
    console.log(`[chat-api] ${timestamp} ${message}`, details);
    return;
  }

  console.log(`[chat-api] ${timestamp} ${message}`);
}

function buildSystemPrompt(context) {
  const sections = context.sections?.join(', ') || 'home, sale, trending, category pages, product pages, cart, and account';
  const shippingThreshold = context.policies?.shippingThreshold ?? 150;
  const shippingWindow = context.policies?.shippingWindow ?? '3-5 business days';
  const returnWindow = context.policies?.returnWindow ?? '30 days';

  return [
    'You are the AI shopping assistant for the StyleAI website.',
    'Answer only using the website context provided in this request.',
    'Do not invent products, discounts, policies, pages, or account features that are not in the context.',
    'If the context is missing something, say that clearly and guide the user to the closest relevant page or action.',
    'If the user asks whether an item may go on sale, you may provide a discount likelihood prediction only when there are enough signals in the request.',
    'Use these signals for discount prediction: purchase volume, repeat purchase behavior, product views/check frequency, cart adds, wishlist behavior if present, trend score, category trend, seasonality, popularity changes, and any explicit sale metadata in the provided context.',
    'When predicting a future discount, do not present it as a fact. Present it as an estimate with uncertainty.',
    'Base the estimate on evidence from the provided data only. Never use outside knowledge.',
    'If the data is weak or incomplete, say that clearly and give a cautious answer.',
    'If the user asks for exact future discount dates or guaranteed markdowns, say you cannot guarantee that.',
    'When relevant, explain the top reasons behind the prediction in plain language.',
    'Prefer concise, practical answers focused on helping the shopper decide whether to buy now or wait.',
    'For discount prediction responses, include: a short conclusion, confidence level, estimated likelihood of discount, estimated discount range if justified by the data, and 2 to 4 evidence-based reasons.',
    'If no meaningful prediction can be made, say so and suggest monitoring the item, checking trending/sale pages, or revisiting later.',
    'If the user asks something unrelated to this website, say you can only help with this website and its catalog.',
    'Keep answers concise, practical, and site-specific.',
    `Available site sections: ${sections}.`,
    `Shipping policy: free shipping over $${shippingThreshold}, standard delivery ${shippingWindow}.`,
    `Returns policy: ${returnWindow} return window.`,
  ].join(' ');
}

function buildUserPrompt(payload) {
  const siteContext = payload.siteContext || {};

  return JSON.stringify(
    {
      currentPage: payload.page || siteContext.page,
      cart: payload.cart || siteContext.cart,
      siteSections: siteContext.sections,
      policies: siteContext.policies,
      catalog: siteContext.catalog,
      conversation: payload.messages,
    },
    null,
    2
  );
}

function extractJsonObject(text) {
  const fencedMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch?.[1]?.trim() || text.trim();

  try {
    return JSON.parse(candidate);
  } catch {
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
      return null;
    }

    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

async function generateGeminiContent(parts, generationConfig = {}) {
  if (!geminiApiKey) {
    const error = new Error('GEMINI_API_KEY is not configured on the chat server.');
    error.statusCode = 503;
    throw error;
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': geminiApiKey,
    },
    body: JSON.stringify({
      contents: parts.map((text) => ({
        role: 'user',
        parts: [{ text }],
      })),
      generationConfig: {
        thinkingConfig: {
          thinkingLevel: 'low',
        },
        ...generationConfig,
      },
    }),
  });

  const data = await response.json();

  logChatEvent('Gemini response received', {
    status: response.status,
    ok: response.ok,
  });

  if (!response.ok) {
    const error = new Error(data.error?.message || 'Gemini request failed.');
    error.statusCode = response.status;
    throw error;
  }

  const text = data.candidates
    ?.flatMap((candidate) => candidate.content?.parts || [])
    .filter((part) => typeof part.text === 'string')
    .map((part) => part.text)
    .join('\n')
    .trim();

  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  return text;
}

async function callGemini(payload) {
  const text = await generateGeminiContent([
    buildSystemPrompt(payload.siteContext),
    buildUserPrompt(payload),
  ]);

  logChatEvent('Gemini reply parsed', {
    preview: text.slice(0, 120),
  });

  return text;
}

async function selectCartRecommendation(payload) {
  const candidates = Array.isArray(payload.candidates) ? payload.candidates : [];

  if (!candidates.length) {
    const error = new Error('At least one recommendation candidate is required.');
    error.statusCode = 400;
    throw error;
  }

  const text = await generateGeminiContent(
    [
      [
        'You are selecting one product for a cart upsell card on an ecommerce site.',
        'Choose exactly one item from the provided candidates.',
        'Prioritize getting the shopper to or just above the free shipping threshold.',
        'Prefer a product that fits the existing cart style or category when possible.',
        'Return strict JSON with keys productId, reason, cta.',
        'reason must be one short sentence under 140 characters.',
        'cta must be one short label under 40 characters.',
        'Use only a productId that appears in the provided candidates.',
      ].join(' '),
      JSON.stringify(
        {
          subtotal: payload.subtotal,
          shippingThreshold: payload.shippingThreshold,
          missingForFreeShipping: payload.shippingThreshold - payload.subtotal,
          cartItems: payload.cartItems,
          candidates,
        },
        null,
        2
      ),
    ],
    { responseMimeType: 'application/json' }
  );

  const parsed = extractJsonObject(text);

  if (!parsed) {
    const error = new Error('Gemini returned invalid JSON for cart recommendation.');
    error.statusCode = 502;
    throw error;
  }

  const productId = Number(parsed.productId);
  const candidate = candidates.find((item) => item.id === productId);

  if (!candidate) {
    const error = new Error('Gemini selected an invalid candidate product.');
    error.statusCode = 502;
    throw error;
  }

  return {
    productId,
    reason:
      typeof parsed.reason === 'string' && parsed.reason.trim()
        ? parsed.reason.trim()
        : 'This item is a strong fit for unlocking free shipping.',
    cta:
      typeof parsed.cta === 'string' && parsed.cta.trim()
        ? parsed.cta.trim()
        : 'Add & Get Free Shipping',
  };
}

createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    try {
      logChatEvent('Incoming /api/chat request', {
        method: req.method,
        pathname: url.pathname,
      });

      const chunks = [];

      for await (const chunk of req) {
        chunks.push(chunk);
      }

      const rawBody = Buffer.concat(chunks).toString('utf8');
      const payload = JSON.parse(rawBody || '{}');

      logChatEvent('Parsed chat payload', {
        messageCount: Array.isArray(payload.messages) ? payload.messages.length : 0,
        currentPage: payload.page ?? null,
      });

      if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
        sendJson(res, 400, { error: 'At least one chat message is required.' });
        return;
      }

      const reply = await callGemini(payload);
      logChatEvent('Sending successful chat response', {
        replyLength: reply.length,
      });
      sendJson(res, 200, { reply });
      return;
    } catch (error) {
      logChatEvent('Chat request failed', {
        statusCode: error.statusCode || 500,
        error: error.message || 'Unexpected chat server error.',
      });
      const statusCode = error.statusCode || 500;
      sendJson(res, statusCode, {
        error: error.message || 'Unexpected chat server error.',
      });
      return;
    }
  }

  if (req.method === 'POST' && url.pathname === '/api/cart-recommendation') {
    try {
      logChatEvent('Incoming /api/cart-recommendation request', {
        method: req.method,
        pathname: url.pathname,
      });

      const chunks = [];

      for await (const chunk of req) {
        chunks.push(chunk);
      }

      const rawBody = Buffer.concat(chunks).toString('utf8');
      const payload = JSON.parse(rawBody || '{}');
      const recommendation = await selectCartRecommendation(payload);

      sendJson(res, 200, recommendation);
      return;
    } catch (error) {
      logChatEvent('Cart recommendation request failed', {
        statusCode: error.statusCode || 500,
        error: error.message || 'Unexpected cart recommendation server error.',
      });
      const statusCode = error.statusCode || 500;
      sendJson(res, statusCode, {
        error: error.message || 'Unexpected cart recommendation server error.',
      });
      return;
    }
  }

  sendJson(res, 404, { error: 'Not found.' });
}).listen(port, () => {
  console.log(`Chat API listening on http://localhost:${port}`);
  if (!geminiApiKey) {
    console.warn('GEMINI_API_KEY is missing. Add it to .env in the project root.');
  }
});
