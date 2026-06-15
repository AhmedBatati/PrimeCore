const crypto = require('crypto');

const MAX_FAILED_ATTEMPTS = 8;
const WINDOW_SECONDS = 15 * 60;
const KEY_PREFIX = 'primecore:owner-login:fail:';
const memoryAttempts = new Map();

function hasKvConfig() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function kvCommand(command) {
  return fetch(process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.KV_REST_API_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(command)
  }).then((response) => {
    if (!response.ok) {
      throw new Error('KV request failed: ' + response.status);
    }

    return response.json();
  }).then((body) => {
    if (body.error) throw new Error(body.error);
    return body.result;
  });
}

function getHeader(req, name) {
  return (req.headers && (req.headers[name] || req.headers[name.toLowerCase()])) || '';
}

function getClientIp(req) {
  const forwardedFor = getHeader(req, 'x-forwarded-for');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return (
    getHeader(req, 'cf-connecting-ip') ||
    getHeader(req, 'x-real-ip') ||
    (req.socket && req.socket.remoteAddress) ||
    'unknown'
  );
}

function rateLimitKey(req) {
  const secret = process.env.OWNER_SESSION_SECRET || 'primecore-owner-login';
  const fingerprint = crypto
    .createHash('sha256')
    .update(getClientIp(req) + ':' + secret)
    .digest('hex')
    .slice(0, 32);

  return KEY_PREFIX + fingerprint;
}

function cleanupMemory(now) {
  for (const [key, entry] of memoryAttempts.entries()) {
    if (entry.expiresAt <= now) {
      memoryAttempts.delete(key);
    }
  }
}

function memoryCheck(key) {
  const now = Date.now();
  cleanupMemory(now);
  const entry = memoryAttempts.get(key);

  if (!entry || entry.expiresAt <= now) {
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((entry.expiresAt - now) / 1000))
    };
  }

  return { allowed: true, retryAfter: 0 };
}

function memoryFailure(key) {
  const now = Date.now();
  cleanupMemory(now);
  const existing = memoryAttempts.get(key);
  const entry = existing && existing.expiresAt > now
    ? existing
    : { count: 0, expiresAt: now + WINDOW_SECONDS * 1000 };

  entry.count += 1;
  memoryAttempts.set(key, entry);

  return memoryCheck(key);
}

function memorySuccess(key) {
  memoryAttempts.delete(key);
}

async function checkLoginRateLimit(req) {
  const key = rateLimitKey(req);

  if (!hasKvConfig()) {
    return memoryCheck(key);
  }

  try {
    const count = Number(await kvCommand(['GET', key])) || 0;

    if (count < MAX_FAILED_ATTEMPTS) {
      return { allowed: true, retryAfter: 0 };
    }

    const ttl = Number(await kvCommand(['TTL', key])) || WINDOW_SECONDS;
    return { allowed: false, retryAfter: Math.max(1, ttl) };
  } catch (error) {
    return memoryCheck(key);
  }
}

async function recordLoginFailure(req) {
  const key = rateLimitKey(req);

  if (!hasKvConfig()) {
    return memoryFailure(key);
  }

  try {
    const count = Number(await kvCommand(['INCR', key])) || 1;

    if (count === 1) {
      await kvCommand(['EXPIRE', key, WINDOW_SECONDS]);
    }

    if (count < MAX_FAILED_ATTEMPTS) {
      return { allowed: true, retryAfter: 0 };
    }

    const ttl = Number(await kvCommand(['TTL', key])) || WINDOW_SECONDS;
    return { allowed: false, retryAfter: Math.max(1, ttl) };
  } catch (error) {
    return memoryFailure(key);
  }
}

async function recordLoginSuccess(req) {
  const key = rateLimitKey(req);
  memorySuccess(key);

  if (!hasKvConfig()) return;

  try {
    await kvCommand(['DEL', key]);
  } catch (error) {
    // A failed cleanup should not block a valid owner login.
  }
}

module.exports = {
  checkLoginRateLimit,
  recordLoginFailure,
  recordLoginSuccess
};
