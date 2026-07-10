import type { Request, Response, NextFunction } from "express";
import { jwtService }        from "../services/jwt.service.js";
import { userRepository }    from "../repositories/user.repository.js";
import { ROLE_PERMISSIONS }  from "../constants/roles.constants.js";
import { AUTH_COOKIES }      from "../constants/auth.constants.js";
import { ApiError }          from "../utils/ApiError.js";

/**
 * Reads the access token from the HTTP-only cookie (preferred) or the
 * Authorization: Bearer header (fallback for API clients).
 * Attaches req.user on success.
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

    // 3. Load user from DB to confirm they are still active
    const user = await userRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      return next(ApiError.unauthorized("User not found or account deactivated"));
    }

    // 4. Attach to request
    req.user = {
      _id:             user._id,
      name:            user.name,
      email:           user.email,
      role:            user.role,
      isEmailVerified: user.isEmailVerified,
      isActive:        user.isActive,
      permissions:     ROLE_PERMISSIONS[user.role] ?? [],
    };

    next();
  } catch (err) {
    next(err);
  }
}
