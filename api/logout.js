const { clearSessionCookie, requireAuth, requireCsrf } = require('../server/auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end();
    return;
  }

  if (!requireAuth(req, res)) return;
  if (!requireCsrf(req, res)) return;

  res.statusCode = 200;
  res.setHeader('Set-Cookie', clearSessionCookie(req));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true }));
};
