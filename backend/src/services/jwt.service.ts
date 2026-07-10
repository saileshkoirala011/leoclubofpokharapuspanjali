import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { env }          from "../config/env.js";
import { getRedis }     from "../config/redis.js";
import { REDIS_KEYS, REFRESH_TTL_S } from "../constants/auth.constants.js";
import type { JwtAccessPayload, JwtRefreshPayload, TokenPair } from "../types/auth.types.js";
import type { Role } from "../constants/roles.constants.js";
import { ApiError } from "../utils/ApiError.js";

export class JwtService {

  signAccess(payload: { sub: string; email: string; role: Role }): string {
    const jti = randomUUID();
    return jwt.sign(
      { sub: payload.sub, email: payload.email, role: payload.role, jti },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions,
    );
  }

  async signRefresh(userId: string): Promise<{ token: string; jti: string }> {
    const jti   = randomUUID();
    const token = jwt.sign(
      { sub: userId, jti },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions,
    );

    const redis = getRedis();
    const key   = REDIS_KEYS.refreshToken(userId, jti);
    await redis.setex(key, REFRESH_TTL_S, "1");
    await redis.sadd(REDIS_KEYS.userTokenSet(userId), jti);
    await redis.expire(REDIS_KEYS.userTokenSet(userId), REFRESH_TTL_S);

    return { token, jti };
  }

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
      accessExpiresAt:  new Date(Date.now() + 15 * 60 * 1000),
      refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
  }

  verifyAccess(token: string): JwtAccessPayload {
    try {
      return jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtAccessPayload;
    } catch {
      throw ApiError.unauthorized("Access token invalid or expired");
    }
  }

  async verifyRefresh(token: string): Promise<JwtRefreshPayload> {
    let payload: JwtRefreshPayload;
    try {
      payload = jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtRefreshPayload;
    } catch {
      throw ApiError.unauthorized("Refresh token invalid or expired");
    }

    const redis  = getRedis();
    const key    = REDIS_KEYS.refreshToken(payload.sub, payload.jti);
    const exists = await redis.get(key);
    if (!exists) throw ApiError.unauthorized("Refresh token revoked");

    await redis.del(key);
    await redis.srem(REDIS_KEYS.userTokenSet(payload.sub), payload.jti);
    return payload;
  }

  async revokeRefresh(userId: string, jti: string): Promise<void> {
    const redis = getRedis();
    await redis.del(REDIS_KEYS.refreshToken(userId, jti));
    await redis.srem(REDIS_KEYS.userTokenSet(userId), jti);
  }

  async revokeAllRefresh(userId: string): Promise<void> {
    const redis  = getRedis();
    const setKey = REDIS_KEYS.userTokenSet(userId);
    const jtis   = await redis.smembers(setKey);
    const pipe   = redis.pipeline();
    jtis.forEach((jti: string) => pipe.del(REDIS_KEYS.refreshToken(userId, jti)));
    pipe.del(setKey);
    await pipe.exec();
  }
}

export const jwtService = new JwtService();
