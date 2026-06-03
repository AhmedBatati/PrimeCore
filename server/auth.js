const crypto = require('crypto');

const COOKIE_NAME = 'primecore_owner_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.OWNER_SESSION_SECRET || '';
}

function getPassword() {
  return process.env.OWNER_PASSWORD || '';
}

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeBase64url(input) {
  var normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  while (normalized.length % 4) normalized += '=';
  return Buffer.from(normalized, 'base64').toString('utf8');
}

function sign(payload) {
  return crypto
    .createHmac('sha256', getSecret())
    .update(payload)
    .digest('base64url');
}

function safeEqual(a, b) {
  var left = Buffer.from(String(a));
  var right = Buffer.from(String(b));

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function readCookie(req, name) {
  var header = req.headers.cookie || '';
  var parts = header.split(';');

  for (var i = 0; i < parts.length; i++) {
    var pair = parts[i].trim();
    var separator = pair.indexOf('=');

    if (separator < 0) continue;

    var key = pair.slice(0, separator);
    var value = pair.slice(separator + 1);

    if (key === name) {
      return decodeURIComponent(value);
    }
  }

  return '';
}

function isSecureHost(req) {
  var host = req.headers.host || '';
  return !/^localhost(:|$)/.test(host) && !/^127\.0\.0\.1(:|$)/.test(host);
}

function createSessionToken() {
  var now = Math.floor(Date.now() / 1000);
  var payload = base64url(JSON.stringify({
    iat: now,
    exp: now + SESSION_TTL_SECONDS
  }));

  return payload + '.' + sign(payload);
}

function createSessionCookie(req) {
  var token = createSessionToken();
  var cookie = COOKIE_NAME + '=' + encodeURIComponent(token) +
    '; Path=/; HttpOnly; SameSite=Lax; Max-Age=' + SESSION_TTL_SECONDS;

  if (isSecureHost(req)) {
    cookie += '; Secure';
  }

  return cookie;
}

function clearSessionCookie(req) {
  var cookie = COOKIE_NAME + '=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';

  if (isSecureHost(req)) {
    cookie += '; Secure';
  }

  return cookie;
}

function verifyToken(token) {
  if (!getSecret() || !token) return false;

  var pieces = token.split('.');
  if (pieces.length !== 2) return false;

  var payload = pieces[0];
  var signature = pieces[1];

  if (!safeEqual(signature, sign(payload))) return false;

  try {
    var data = JSON.parse(decodeBase64url(payload));
    var now = Math.floor(Date.now() / 1000);
    return Boolean(data.exp && data.exp > now);
  } catch (error) {
    return false;
  }
}

function verifyRequest(req) {
  return verifyToken(readCookie(req, COOKIE_NAME));
}

function passwordMatches(input) {
  var password = getPassword();
  if (!password || !input) return false;
  return safeEqual(input, password);
}

function requireAuth(req, res) {
  if (verifyRequest(req)) return true;

  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
  return false;
}

module.exports = {
  COOKIE_NAME,
  clearSessionCookie,
  createSessionCookie,
  passwordMatches,
  requireAuth,
  verifyRequest,
  verifyToken
};
