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

function getHeader(req, name) {
  return (req.headers && (req.headers[name] || req.headers[name.toLowerCase()])) || '';
}

function firstHeaderValue(value) {
  return String(value || '').split(',')[0].trim();
}

function isSecureHost(req) {
  var host = req.headers.host || '';
  return !/^localhost(:|$)/.test(host) && !/^127\.0\.0\.1(:|$)/.test(host);
}

function getRequestOrigin(req) {
  var host = firstHeaderValue(getHeader(req, 'x-forwarded-host') || getHeader(req, 'host'));
  var proto = firstHeaderValue(getHeader(req, 'x-forwarded-proto'));

  if (!proto) {
    proto = isSecureHost(req) ? 'https' : 'http';
  }

  return host ? proto + '://' + host : '';
}

function getSubmittedOrigin(req) {
  var origin = getHeader(req, 'origin');
  var referer = getHeader(req, 'referer');

  if (origin) return origin;

  if (referer) {
    try {
      return new URL(referer).origin;
    } catch (error) {
      return '';
    }
  }

  return '';
}

function verifySameOrigin(req) {
  var expectedOrigin = getRequestOrigin(req);
  var submittedOrigin = getSubmittedOrigin(req);

  return Boolean(expectedOrigin && submittedOrigin && submittedOrigin === expectedOrigin);
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

function createCsrfToken(req) {
  var token = readCookie(req, COOKIE_NAME);
  if (!verifyToken(token)) return '';
  return sign('csrf:' + token);
}

function verifyCsrfRequest(req) {
  var token = readCookie(req, COOKIE_NAME);
  var csrfToken = getHeader(req, 'x-csrf-token');

  if (!verifyToken(token) || !csrfToken) return false;
  if (!verifySameOrigin(req)) return false;

  return safeEqual(csrfToken, sign('csrf:' + token));
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

function requireCsrf(req, res) {
  if (verifyCsrfRequest(req)) return true;

  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: false, error: 'forbidden' }));
  return false;
}

function requireSameOrigin(req, res) {
  if (verifySameOrigin(req)) return true;

  res.statusCode = 403;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ ok: false, error: 'forbidden' }));
  return false;
}

module.exports = {
  COOKIE_NAME,
  clearSessionCookie,
  createCsrfToken,
  createSessionCookie,
  passwordMatches,
  requireAuth,
  requireCsrf,
  requireSameOrigin,
  verifyRequest,
  verifyToken
};
