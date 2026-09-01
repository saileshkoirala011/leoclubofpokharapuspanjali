import { Router } from "express";
import * as user                from "../controllers/user.controller.js";
import { authenticate }         from "../middleware/authenticate.js";
import { requireRole, requirePermission } from "../middleware/authorize.js";
import { validate }             from "../middleware/validate.js";
import { assignRoleSchema }     from "../validators/user.validator.js";

const router = Router();

// All admin routes require authentication + admin role minimum
router.use(authenticate, requireRole("admin"));

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags: [Admin]
 *     summary: List all users (admin, paginated)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20, maximum: 100 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, default: "-createdAt" }
 *         description: Sort field — prefix with - for descending
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [user, staff, manager, admin, super_admin] }
 *         description: Filter by role
 *     responses:
 *       200:
 *         description: Paginated user list
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         users:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/User' }
 *                         pagination: { $ref: '#/components/schemas/Pagination' }
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Admin role required
 */
router.get("/users", user.adminListUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     tags: [Admin]
 *     summary: Deactivate a user account (soft-delete, requires delete:users permission)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User deactivated
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: User not found
 */
router.delete(
  "/users/:id",
  requirePermission("delete:users"),
  user.deleteUser,
);

/**
 * @swagger
 * /admin/users/{id}/role:
 *   put:
 *     tags: [Admin]
 *     summary: Assign a role to a user (super_admin only, requires assign:roles permission)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role]
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, staff, manager, admin, super_admin]
 *     responses:
 *       200:
 *         description: Role assigned
 *       403:
 *         description: super_admin role required
 *       404:
 *         description: User not found
 */
router.put(
  "/users/:id/role",
  requireRole("super_admin"),
  requirePermission("assign:roles"),
  validate(assignRoleSchema),
  user.assignRole,
);

export default router;
