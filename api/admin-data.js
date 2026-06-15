const { requireAuth, requireCsrf } = require('../server/auth');
const { readData, writeData } = require('../server/content-store');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!requireAuth(req, res)) return;

  try {
    if (req.method === 'GET') {
      const data = await readData();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
      return;
    }

    if (req.method === 'PUT') {
      if (!requireCsrf(req, res)) return;

      const payload = JSON.parse(await readBody(req) || '{}');
      const data = await writeData(payload);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(data));
      return;
    }

    res.statusCode = 405;
    res.setHeader('Allow', 'GET, PUT');
    res.end();
  } catch (error) {
    res.statusCode = error.statusCode || 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'save_failed' }));
  }
};
