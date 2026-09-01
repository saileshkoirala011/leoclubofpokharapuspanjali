import { Router } from "express";
import * as user             from "../controllers/user.controller.js";
import { authenticate }      from "../middleware/authenticate.js";
import { requireRole, requireOwnership } from "../middleware/authorize.js";
import { validate }          from "../middleware/validate.js";
import { updateProfileSchema, listUsersSchema } from "../validators/user.validator.js";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: List users (admin only, paginated with optional filters)
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
 *       - in: query
 *         name: role
 *         schema: { type: string, enum: [user, staff, manager, admin, super_admin] }
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
 *       403:
 *         description: Admin role required
 */
router.get("/", requireRole("admin"), validate(listUsersSchema, "query"), user.listUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user by ID (admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data: { $ref: '#/components/schemas/User' }
 *       404:
 *         description: User not found
 *   put:
 *     tags: [Users]
 *     summary: Update a user profile (self or admin)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:   { type: string }
 *               avatar: { type: string, nullable: true }
 *     responses:
 *       200:
 *         description: User updated
 *       403:
 *         description: Can only update your own profile unless admin
 *       404:
 *         description: User not found
 *   delete:
 *     tags: [Users]
 *     summary: Deactivate a user (admin only — soft delete)
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
 *         description: Admin role required
 *       404:
 *         description: User not found
 */
router.get("/:id",  requireRole("admin"), user.getUserById);

router.put(
  "/:id",
  requireOwnership((req) => {
    const id = req.params["id"];
    return Array.isArray(id) ? (id[0] ?? "") : (id ?? "");
  }),
  validate(updateProfileSchema),
  user.updateUser,
);

router.delete("/:id", requireRole("admin"), user.deleteUser);

export default router;
