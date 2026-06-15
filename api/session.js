const { createCsrfToken, verifyRequest } = require('../server/auth');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end();
    return;
  }

  const authenticated = verifyRequest(req);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({
    authenticated,
    csrfToken: authenticated ? createCsrfToken(req) : ''
  }));
};
