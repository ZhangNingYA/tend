import { createServer } from 'node:http';
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const port = Number(process.env.TEND_PORT || 8787);
const host = process.env.TEND_HOST || '127.0.0.1';
const databasePath = resolve(process.env.TEND_DB_PATH || './data/comments.sqlite');
const cookieSecure = process.env.TEND_COOKIE_SECURE !== '0';
const cookieName = cookieSecure ? '__Host-tend_session' : 'tend_session';
const sessionTtlSeconds = 60 * 60 * 24 * 7;
const maxBodyLength = 2000;
const allowedOrigins = (process.env.TEND_ALLOWED_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const loginAttempts = new Map();
const loginWindowMs = 15 * 60 * 1000;
const loginAttemptLimit = 8;

const users = [
  { id: 'person-1', name: process.env.TEND_USER_ONE_NAME || '我', passwordHash: process.env.TEND_USER_ONE_PASSWORD_HASH },
  { id: 'person-2', name: process.env.TEND_USER_TWO_NAME || '猪猪', passwordHash: process.env.TEND_USER_TWO_PASSWORD_HASH },
].filter((user) => user.passwordHash);

if (!users.length) {
  throw new Error('Set TEND_USER_ONE_PASSWORD_HASH and TEND_USER_TWO_PASSWORD_HASH before starting the comments API.');
}

mkdirSync(dirname(databasePath), { recursive: true });
const db = new DatabaseSync(databasePath);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA busy_timeout = 5000;

  CREATE TABLE IF NOT EXISTS comments_users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comments_sessions (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES comments_users(id),
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    article_slug TEXT NOT NULL,
    anchor_key TEXT NOT NULL,
    anchor_text_snapshot TEXT NOT NULL,
    author_id TEXT NOT NULL REFERENCES comments_users(id),
    body TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT
  );

  CREATE INDEX IF NOT EXISTS comments_article_anchor_idx
    ON comments(article_slug, anchor_key, created_at);
  CREATE INDEX IF NOT EXISTS comments_session_expiry_idx
    ON comments_sessions(expires_at);
`);

const insertUser = db.prepare(`
  INSERT INTO comments_users (id, name, created_at)
  VALUES (?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET name = excluded.name
`);
const now = new Date().toISOString();
users.forEach((user) => insertUser.run(user.id, user.name, now));

const selectUserById = db.prepare('SELECT id, name FROM comments_users WHERE id = ?');
const selectSessionUser = db.prepare(`
  SELECT comments_users.id, comments_users.name
  FROM comments_sessions
  JOIN comments_users ON comments_users.id = comments_sessions.user_id
  WHERE comments_sessions.token_hash = ? AND comments_sessions.expires_at > ?
`);
const deleteExpiredSessions = db.prepare('DELETE FROM comments_sessions WHERE expires_at <= ?');
const insertSession = db.prepare(`
  INSERT INTO comments_sessions (token_hash, user_id, created_at, expires_at)
  VALUES (?, ?, ?, ?)
`);
const deleteSession = db.prepare('DELETE FROM comments_sessions WHERE token_hash = ?');
const selectComments = db.prepare(`
  SELECT comments.id, comments.article_slug, comments.anchor_key, comments.anchor_text_snapshot,
         comments.author_id, comments.body, comments.created_at, comments.updated_at,
         comments_users.name AS author_name
  FROM comments
  JOIN comments_users ON comments_users.id = comments.author_id
  WHERE comments.article_slug = ?
    AND comments.status = 'published'
    AND comments.deleted_at IS NULL
  ORDER BY comments.created_at ASC
`);
const insertComment = db.prepare(`
  INSERT INTO comments (
    id, article_slug, anchor_key, anchor_text_snapshot, author_id, body,
    status, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?)
`);
const selectCommentById = db.prepare(`
  SELECT comments.id, comments.article_slug, comments.anchor_key, comments.anchor_text_snapshot,
         comments.author_id, comments.body, comments.created_at, comments.updated_at,
         comments_users.name AS author_name
  FROM comments
  JOIN comments_users ON comments_users.id = comments.author_id
  WHERE comments.id = ? AND comments.deleted_at IS NULL
`);
const updateComment = db.prepare(`
  UPDATE comments SET body = ?, updated_at = ?
  WHERE id = ? AND author_id = ? AND deleted_at IS NULL
`);
const softDeleteComment = db.prepare(`
  UPDATE comments SET deleted_at = ?, updated_at = ?
  WHERE id = ? AND author_id = ? AND deleted_at IS NULL
`);

function hashToken(token) {
  return createHash('sha256').update(token).digest('hex');
}

function parsePasswordHash(value) {
  const [algorithm, cost, blockSize, parallelism, salt, digest] = String(value || '').split(':');
  if (algorithm !== 'scrypt' || !cost || !blockSize || !parallelism || !salt || !digest) return null;
  return {
    cost: Number(cost),
    blockSize: Number(blockSize),
    parallelism: Number(parallelism),
    salt: Buffer.from(salt, 'base64url'),
    digest: Buffer.from(digest, 'base64url'),
  };
}

function verifyPassword(password, storedHash) {
  const parsed = parsePasswordHash(storedHash);
  if (!parsed || !Number.isSafeInteger(parsed.cost) || !Number.isSafeInteger(parsed.blockSize) || !Number.isSafeInteger(parsed.parallelism)) return false;
  const derived = scryptSync(password, parsed.salt, parsed.digest.length, {
    N: parsed.cost,
    r: parsed.blockSize,
    p: parsed.parallelism,
    maxmem: 64 * 1024 * 1024,
  });
  return derived.length === parsed.digest.length && timingSafeEqual(derived, parsed.digest);
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map((part) => part.trim().split('=').map(decodeURIComponent)).filter(([key]) => key));
}

function sessionCookie(token, maxAge = sessionTtlSeconds) {
  return `${cookieName}=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; HttpOnly; SameSite=Lax${cookieSecure ? '; Secure' : ''}`;
}

function requestOriginAllowed(origin) {
  return !origin || !allowedOrigins.length || allowedOrigins.includes(origin);
}

function setCommonHeaders(res, request) {
  const origin = request.headers.origin;
  if (origin && requestOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Cache-Control', 'no-store');
}

function sendJson(res, request, status, payload, extraHeaders = {}) {
  setCommonHeaders(res, request);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders });
  res.end(JSON.stringify(payload));
}

function sendEmpty(res, request, status, extraHeaders = {}) {
  setCommonHeaders(res, request);
  res.writeHead(status, extraHeaders);
  res.end();
}

function readJson(request) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let length = 0;
    request.on('data', (chunk) => {
      length += chunk.length;
      if (length > 64 * 1024) {
        reject(new Error('请求内容过大'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      if (!chunks.length) return resolveBody({});
      try {
        resolveBody(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('请求内容不是有效 JSON'));
      }
    });
    request.on('error', reject);
  });
}

function cleanExpiredSessions() {
  deleteExpiredSessions.run(new Date().toISOString());
}

function loginRateKey(request) {
  return request.headers['cf-connecting-ip'] || request.headers['x-forwarded-for']?.split(',')[0].trim() || request.socket.remoteAddress || 'unknown';
}

function enforceLoginRateLimit(request) {
  const key = loginRateKey(request);
  const current = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || current - entry.startedAt >= loginWindowMs) {
    loginAttempts.set(key, { startedAt: current, count: 0 });
    return;
  }
  if (entry.count >= loginAttemptLimit) {
    const error = new Error('尝试次数过多，请稍后再试');
    error.status = 429;
    throw error;
  }
}

function recordLoginFailure(request) {
  const key = loginRateKey(request);
  const current = Date.now();
  const entry = loginAttempts.get(key);
  if (!entry || current - entry.startedAt >= loginWindowMs) {
    loginAttempts.set(key, { startedAt: current, count: 1 });
  } else {
    entry.count += 1;
  }
}

function clearLoginFailures(request) {
  loginAttempts.delete(loginRateKey(request));
}

function getSession(request) {
  cleanExpiredSessions();
  const token = parseCookies(request.headers.cookie || '')[cookieName];
  if (!token) return null;
  const user = selectSessionUser.get(hashToken(token), new Date().toISOString());
  return user ? { token, user } : null;
}

function requireSession(request) {
  const session = getSession(request);
  if (!session) {
    const error = new Error('请先输入密码');
    error.status = 401;
    throw error;
  }
  return session;
}

function requireAllowedOrigin(request) {
  const origin = request.headers.origin;
  if (origin && !requestOriginAllowed(origin)) {
    const error = new Error('请求来源不受信任');
    error.status = 403;
    throw error;
  }
}

function validateArticleSlug(value) {
  return typeof value === 'string' && /^[a-z0-9][a-z0-9-]{0,100}$/.test(value);
}

function validateAnchorKey(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9/_-]{1,240}$/.test(value);
}

function validateBody(value) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxBodyLength;
}

function serializeComment(row) {
  return {
    id: row.id,
    articleSlug: row.article_slug,
    anchorKey: row.anchor_key,
    anchorTextSnapshot: row.anchor_text_snapshot,
    authorId: row.author_id,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizedPath(pathname) {
  return pathname.replace(/^\/api(?=\/|$)/, '') || '/';
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const path = normalizedPath(url.pathname);

  if (request.method === 'OPTIONS') {
    if (!requestOriginAllowed(request.headers.origin)) return sendEmpty(response, request, 403);
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.setHeader('Access-Control-Max-Age', '86400');
    return sendEmpty(response, request, 204);
  }

  try {
    if (request.method === 'GET' && path === '/health') {
      return sendJson(response, request, 200, { ok: true });
    }

    if (request.method === 'GET' && path === '/auth/me') {
      const session = getSession(request);
      return sendJson(response, request, 200, { user: session?.user || null });
    }

    if (request.method === 'POST' && path === '/auth/login') {
      requireAllowedOrigin(request);
      enforceLoginRateLimit(request);
      const body = await readJson(request);
      if (typeof body.password !== 'string' || body.password.length < 1 || body.password.length > 256) {
        const error = new Error('密码错误');
        error.status = 401;
        throw error;
      }
      const user = users.find((candidate) => verifyPassword(body.password, candidate.passwordHash));
      if (!user) {
        recordLoginFailure(request);
        const error = new Error('密码错误');
        error.status = 401;
        throw error;
      }

      const token = randomBytes(32).toString('base64url');
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + sessionTtlSeconds * 1000);
      insertSession.run(hashToken(token), user.id, createdAt.toISOString(), expiresAt.toISOString());
      clearLoginFailures(request);
      return sendJson(response, request, 200, { user: { id: user.id, name: user.name }, expiresAt: expiresAt.toISOString() }, { 'Set-Cookie': sessionCookie(token) });
    }

    if (request.method === 'POST' && path === '/auth/logout') {
      requireAllowedOrigin(request);
      const session = getSession(request);
      if (session) deleteSession.run(hashToken(session.token));
      return sendJson(response, request, 200, { ok: true }, { 'Set-Cookie': sessionCookie('', 0) });
    }

    if (request.method === 'GET' && path === '/comments') {
      const articleSlug = url.searchParams.get('article');
      if (!validateArticleSlug(articleSlug)) {
        const error = new Error('文章标识无效');
        error.status = 400;
        throw error;
      }
      return sendJson(response, request, 200, { comments: selectComments.all(articleSlug).map(serializeComment) });
    }

    if (request.method === 'POST' && path === '/comments') {
      requireAllowedOrigin(request);
      const session = requireSession(request);
      const body = await readJson(request);
      if (!validateArticleSlug(body.articleSlug) || !validateAnchorKey(body.anchorKey) || typeof body.anchorTextSnapshot !== 'string' || body.anchorTextSnapshot.length > 500 || !validateBody(body.body)) {
        const error = new Error('评论内容无效');
        error.status = 400;
        throw error;
      }
      const timestamp = new Date().toISOString();
      const id = randomUUID();
      insertComment.run(id, body.articleSlug, body.anchorKey, body.anchorTextSnapshot.trim(), session.user.id, body.body.trim(), timestamp, timestamp);
      return sendJson(response, request, 201, { comment: serializeComment(selectCommentById.get(id)) });
    }

    const commentMatch = path.match(/^\/comments\/([0-9a-f-]+)$/i);
    if (commentMatch && request.method === 'PATCH') {
      requireAllowedOrigin(request);
      const session = requireSession(request);
      const body = await readJson(request);
      if (!validateBody(body.body)) {
        const error = new Error('评论内容无效');
        error.status = 400;
        throw error;
      }
      const timestamp = new Date().toISOString();
      const result = updateComment.run(body.body.trim(), timestamp, commentMatch[1], session.user.id);
      if (!result.changes) {
        const error = new Error('评论不存在或无权修改');
        error.status = 404;
        throw error;
      }
      return sendJson(response, request, 200, { comment: serializeComment(selectCommentById.get(commentMatch[1])) });
    }

    if (commentMatch && request.method === 'DELETE') {
      requireAllowedOrigin(request);
      const session = requireSession(request);
      const timestamp = new Date().toISOString();
      const result = softDeleteComment.run(timestamp, timestamp, commentMatch[1], session.user.id);
      if (!result.changes) {
        const error = new Error('评论不存在或无权删除');
        error.status = 404;
        throw error;
      }
      return sendJson(response, request, 200, { ok: true });
    }

    return sendJson(response, request, 404, { error: '接口不存在' });
  } catch (error) {
    const status = Number.isInteger(error.status) ? error.status : 500;
    if (status >= 500) console.error(error);
    return sendJson(response, request, status, { error: error.message || '服务器错误' });
  }
});

server.listen(port, host, () => {
  console.log(`comments API listening on http://${host}:${port}`);
  console.log(`database: ${databasePath}`);
});

function shutdown() {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
