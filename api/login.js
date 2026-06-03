const { createSessionCookie, passwordMatches } = require('../server/auth');

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1024 * 16) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end();
    return;
  }

  if (!process.env.OWNER_PASSWORD || !process.env.OWNER_SESSION_SECRET) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'missing_owner_env' }));
    return;
  }

  try {
    const payload = JSON.parse(await readBody(req) || '{}');

    if (!passwordMatches(payload.password)) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({ ok: false, error: 'invalid_credentials' }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Set-Cookie', createSessionCookie(req));
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: true }));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'bad_request' }));
  }
};
