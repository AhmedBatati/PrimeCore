const { publicData, readData } = require('../server/content-store');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    res.end();
    return;
  }

  try {
    const data = await readData();
    res.statusCode = 200;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(publicData(data)));
  } catch (error) {
    res.statusCode = error.statusCode || 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ ok: false, error: 'content_unavailable' }));
  }
};
