const { clearSessionCookie } = require('../server/auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end();
    return;
  }

  res.statusCode = 200;
  res.setHeader('Set-Cookie', clearSessionCookie(req));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: true }));
};
