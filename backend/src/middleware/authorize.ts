import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ROLE_HIERARCHY, type Role, type Permission } from "../constants/roles.constants.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Role-based guard.
 * Passes if req.user.role is in the allowed list OR has a higher hierarchy level.
 *
 * @example  router.get("/admin", authenticate, requireRole("admin"), handler)
 */
export function requireRole(...roles: Role[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(ApiError.unauthorized());

    const userLevel = ROLE_HIERARCHY[req.user.role] ?? -1;
    const minLevel  = Math.min(...roles.map((r) => ROLE_HIERARCHY[r] ?? 99));

    if (userLevel >= minLevel) return next();
    next(ApiError.forbidden("Insufficient role"));
  };
}

/**
 * Permission-based guard.
 * Passes if req.user has ALL listed permissions.
 *
 * @example  router.delete("/users/:id", authenticate, requirePermission("delete:users"), handler)
 */
export function requirePermission(...perms: Permission[]): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(ApiError.unauthorized());

    const has = perms.every((p) => req.user!.permissions.includes(p));
    if (has) return next();
    next(ApiError.forbidden("Missing required permission"));
  };
}

/**
 * Ownership guard — allows access if the authenticated user is the resource
 * owner OR has admin-level role.
 *
 * @param getOwnerId  Function that extracts the owner ID from the request.
 * @example requireOwnership((req) => req.params.id)
 */
export function requireOwnership(
  getOwnerId: (req: Request) => string,
): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(ApiError.unauthorized());

    const isAdmin = ROLE_HIERARCHY[req.user.role] >= ROLE_HIERARCHY["admin"];
    const isOwner = req.user._id.toString() === getOwnerId(req);

    if (isAdmin || isOwner) return next();
    next(ApiError.forbidden("Access denied — not the resource owner"));
  };
}
