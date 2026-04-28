const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? '';

function normalizeApiBaseUrl(baseUrl: string) {
  if (!baseUrl) {
    return '';
  }

  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}

const apiBaseUrl = normalizeApiBaseUrl(rawApiBaseUrl);

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return apiBaseUrl ? `${apiBaseUrl}${normalizedPath}` : normalizedPath;
}