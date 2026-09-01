import type { Request, Response, NextFunction } from "express";
import { jwtService }        from "../services/jwt.service.js";
import { userRepository }    from "../repositories/user.repository.js";
import { ROLE_PERMISSIONS }  from "../constants/roles.constants.js";
import { AUTH_COOKIES }      from "../constants/auth.constants.js";
import { ApiError }          from "../utils/ApiError.js";
import { safeRedis }         from "../config/redis.js";
import type { AuthenticatedUser } from "../types/auth.types.js";

// Cache TTL: 60 seconds. Short enough to propagate deactivations quickly,
// long enough to save the DB round-trip on every request.
const USER_CACHE_TTL = 60;

function cacheKey(userId: string): string {
  return `user_active:${userId}`;
}

/**
 * Reads the access token from the HTTP-only cookie (preferred) or the
 * Authorization: Bearer header (fallback for API clients).
 * Attaches req.user on success.
 *
 * DB lookup is Redis-cached for USER_CACHE_TTL seconds to avoid hitting
 * MongoDB on every authenticated request. Cache is stored as JSON.
 */
export async function authenticate(
  req:  Request,
  res:  Response,
  next: NextFunction,
): Promise<void> {
  try {
    // 1. Extract token
    const fromCookie = req.cookies?.[AUTH_COOKIES.ACCESS_TOKEN] as string | undefined;
    const fromHeader = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice(7)
      : undefined;
    const token = fromCookie ?? fromHeader;

    if (!token) return next(ApiError.unauthorized("No access token provided"));

    // 2. Verify signature & expiry
    const payload = jwtService.verifyAccess(token);
    const userId  = payload.sub;

    // 3. Try Redis cache first
    const cached = await safeRedis<string | null>(
      (client) => client.get(cacheKey(userId)),
      null,
    );

    let authUser: AuthenticatedUser | null = null;

    if (cached) {
      try {
        authUser = JSON.parse(cached) as AuthenticatedUser;
      } catch {
        // malformed cache entry — fall through to DB
      }
    }

    if (!authUser) {
      // 4. Cache miss — load from DB
      const user = await userRepository.findById(userId);
      if (!user || !user.isActive) {
        return next(ApiError.unauthorized("User not found or account deactivated"));
      }

      authUser = {
        _id:             user._id,
        name:            user.name,
        email:           user.email,
        role:            user.role,
        isEmailVerified: user.isEmailVerified,
        isActive:        user.isActive,
        permissions:     ROLE_PERMISSIONS[user.role] ?? [],
      };

      // 5. Populate cache (non-blocking, never fails the request)
      void safeRedis(
        (client) => client.setex(cacheKey(userId), USER_CACHE_TTL, JSON.stringify(authUser)),
        null,
      );
    }

    // 6. Attach to request
    req.user = authUser;
    next();
  } catch (err) {
    next(err);
  }
}
