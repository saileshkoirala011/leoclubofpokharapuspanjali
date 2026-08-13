import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env }         from "../config/env.js";
import { safeRedis }   from "../config/redis.js";
import { REDIS_KEYS, REFRESH_TTL_S } from "../constants/auth.constants.js";
import type { JwtAccessPayload, JwtRefreshPayload, TokenPair } from "../types/auth.types.js";
import type { Role } from "../constants/roles.constants.js";
import { ApiError } from "../utils/ApiError.js";
import { logger }   from "../utils/logger.js";

/**
 * In-memory fallback token store used when Redis is unavailable.
 * Entries expire automatically via a TTL check.
 * This is intentionally simple — for development / Redis-down scenarios only.
 */
const memStore = new Map<string, number>(); // key → expiresAt (ms timestamp)

function memSet(key: string, ttlSeconds: number): void {
  memStore.set(key, Date.now() + ttlSeconds * 1_000);
}
function memHas(key: string): boolean {
  const exp = memStore.get(key);
  if (exp === undefined) return false;
  if (Date.now() > exp)  { memStore.delete(key); return false; }
  return true;
}
function memDel(key: string): void { memStore.delete(key); }

// ── JwtService ────────────────────────────────────────────────────────────────

export class JwtService {

  // ── Sign access token (sync, no Redis) ───────────────────────────────────

  signAccess(payload: { sub: string; email: string; role: Role }): string {
    const jti = randomUUID();
    return jwt.sign(
      { sub: payload.sub, email: payload.email, role: payload.role, jti },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions,
    );
  }

  // ── Sign refresh token + store in Redis (or mem fallback) ────────────────

  async signRefresh(userId: string): Promise<{ token: string; jti: string }> {
    const jti   = randomUUID();
    const token = jwt.sign(
      { sub: userId, jti },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions,
    );

    const tokenKey = REDIS_KEYS.refreshToken(userId, jti);
    const setKey   = REDIS_KEYS.userTokenSet(userId);

    // Try Redis first; fall back to in-memory
    const stored = await safeRedis(async (redis) => {
      await redis.setex(tokenKey, REFRESH_TTL_S, "1");
      await redis.sadd(setKey, jti);
      await redis.expire(setKey, REFRESH_TTL_S);
      return true;
    }, false);

    if (!stored) {
      logger.warn("JWT: using in-memory token store (Redis unavailable)");
      memSet(tokenKey, REFRESH_TTL_S);
    }

    return { token, jti };
  }

  // ── Issue access + refresh pair ───────────────────────────────────────────

  async issueTokenPair(user: {
    _id:   { toString(): string };
    email: string;
    role:  Role;
  }): Promise<TokenPair> {
    const userId      = user._id.toString();
    const accessToken = this.signAccess({ sub: userId, email: user.email, role: user.role });
    const { token: refreshToken } = await this.signRefresh(userId);
    return {
      accessToken,
      refreshToken,
      accessExpiresAt:  new Date(Date.now() + 15 * 60 * 1_000),
      refreshExpiresAt: new Date(Date.now() +  7 * 24 * 60 * 60 * 1_000),
    };
  }

  // ── Verify access token (sync) ────────────────────────────────────────────

  verifyAccess(token: string): JwtAccessPayload {
    try {
      return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtAccessPayload;
    } catch {
      throw ApiError.unauthorized("Access token invalid or expired");
    }
  }

  // ── Verify refresh token + revoke from store ──────────────────────────────

  async verifyRefresh(token: string): Promise<JwtRefreshPayload> {
    let payload: JwtRefreshPayload;
    try {
      payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtRefreshPayload;
    } catch {
      throw ApiError.unauthorized("Refresh token invalid or expired");
    }

    const tokenKey = REDIS_KEYS.refreshToken(payload.sub, payload.jti);
    const setKey   = REDIS_KEYS.userTokenSet(payload.sub);

    // Check Redis first; fall back to in-memory
    const valid = await safeRedis(async (redis) => {
      const exists = await redis.get(tokenKey);
      if (!exists) return false;
      await redis.del(tokenKey);
      await redis.srem(setKey, payload.jti);
      return true;
    }, memHas(tokenKey));   // fallback: check in-memory store

    if (!valid) {
      // If Redis is down but mem also says no, it may simply have expired
      // — only throw if Redis was available and explicitly said "not found"
      const redisUp = await safeRedis(async (redis) => {
        await redis.ping();
        return true;
      }, false);

      if (redisUp) throw ApiError.unauthorized("Refresh token revoked or expired");
      // Redis is down — treat as valid to avoid locking users out
      logger.warn("JWT: refresh token verified without Redis — proceeding");
    } else {
      // Clean up mem store if we used it
      memDel(tokenKey);
    }

    return payload;
  }

  // ── Revoke single refresh token ───────────────────────────────────────────

  async revokeRefresh(userId: string, jti: string): Promise<void> {
    const tokenKey = REDIS_KEYS.refreshToken(userId, jti);
    const setKey   = REDIS_KEYS.userTokenSet(userId);

    await safeRedis(async (redis) => {
      await redis.del(tokenKey);
      await redis.srem(setKey, jti);
    }, undefined);

    memDel(tokenKey);
  }

  // ── Revoke all refresh tokens for a user ─────────────────────────────────

  async revokeAllRefresh(userId: string): Promise<void> {
    const setKey = REDIS_KEYS.userTokenSet(userId);

    await safeRedis(async (redis) => {
      const jtis = await redis.smembers(setKey);
      const pipe = redis.pipeline();
      jtis.forEach((jti: string) => pipe.del(REDIS_KEYS.refreshToken(userId, jti)));
      pipe.del(setKey);
      await pipe.exec();
    }, undefined);

    // Clean up any in-memory entries for this user
    for (const key of [...memStore.keys()]) {
      if (key.startsWith(`refresh:${userId}:`)) memStore.delete(key);
    }
  }
}

export const jwtService = new JwtService();
