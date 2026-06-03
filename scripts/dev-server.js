const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const port = Number(process.env.PORT) || 4177;
const ownerCookieName = 'primecore_owner_session';

function loadEnvFile() {
  const envPath = path.join(root, '.env.local');

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator < 0) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();

    if (key && process.env[key] == null) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const handlers = {
  '/api/login': require('../api/login'),
  '/api/logout': require('../api/logout'),
  '/api/session': require('../api/session'),
  '/api/public-data': require('../api/public-data'),
  '/api/admin-data': require('../api/admin-data')
};

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function serveStatic(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === '/') pathname = '/index.html';

  if (pathname === '/owner-dashboard.html' && !hasCookie(req, ownerCookieName)) {
    res.writeHead(302, {
      Location: '/owner-login.html?next=%2Fowner-dashboard.html'
    });
    res.end();
    return;
  }

  const file = path.normalize(path.join(root, pathname));
  const safeRoot = path.normalize(root + path.sep);

  if (!file.startsWith(safeRoot)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(file, (error, body) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream'
    });
    res.end(body);
  });
}

function hasCookie(req, name) {
  const header = req.headers.cookie || '';
  const cookies = header.split(';');

  for (const cookie of cookies) {
    const separator = cookie.indexOf('=');
    if (separator < 0) continue;

    const key = cookie.slice(0, separator).trim();
    const value = cookie.slice(separator + 1).trim();

    if (key === name && value) {
      return true;
    }
  }

  return false;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const handler = handlers[url.pathname];

  if (handler) {
    handler(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`PrimeCore local server: http://127.0.0.1:${port}`);
  console.log(`Owner login: http://127.0.0.1:${port}/owner-login.html`);
});
