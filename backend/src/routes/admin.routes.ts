import { Router } from "express";
import * as user                from "../controllers/user.controller.js";
import { authenticate }         from "../middleware/authenticate.js";
import { requireRole, requirePermission } from "../middleware/authorize.js";
import { validate }             from "../middleware/validate.js";
import { assignRoleSchema }     from "../validators/user.validator.js";

const router = Router();

// All admin routes require authentication + admin role minimum
router.use(authenticate, requireRole("admin"));

/** GET  /api/admin/users           — list all users */
router.get("/users",     user.adminListUsers);

/** DELETE /api/admin/users/:id     — deactivate a user */
router.delete(
  "/users/:id",
  requirePermission("delete:users"),
  user.deleteUser,
);

/** PUT /api/admin/users/:id/role   — assign role (super_admin only) */
router.put(
  "/users/:id/role",
  requireRole("super_admin"),
  requirePermission("assign:roles"),
  validate(assignRoleSchema),
  user.assignRole,
);

export default router;
