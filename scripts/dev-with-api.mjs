import { spawn } from 'node:child_process';
import net from 'node:net';

const childProcesses = [];
const preferredApiPort = Number(process.env.CHAT_API_PORT || 8787);

function run(command, args, options = {}) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      ...options.env,
    },
  });

  childProcesses.push(child);

  child.on('exit', (code) => {
    if (code !== 0) {
      shutdown(code ?? 1);
    }
  });
}

function shutdown(exitCode = 0) {
  for (const child of childProcesses) {
    if (!child.killed) {
      child.kill();
    }
  }
  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

function canListenOnPort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      resolve(false);
    });

    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '127.0.0.1');
  });
}

async function findAvailablePort(startPort, maxAttempts = 20) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const port = startPort + attempt;

    if (await canListenOnPort(port)) {
      return port;
    }
  }

  throw new Error(`Unable to find an open port starting at ${startPort}.`);
}

const apiPort = await findAvailablePort(preferredApiPort);

if (apiPort !== preferredApiPort) {
  console.warn(`CHAT_API_PORT ${preferredApiPort} is in use, using ${apiPort} for this session.`);
}

run('node', ['server/chat-server.mjs'], {
  env: {
    CHAT_API_PORT: String(apiPort),
  },
});
run('node', ['./node_modules/vite/bin/vite.js'], {
  env: {
    CHAT_API_PORT: String(apiPort),
  },
});
