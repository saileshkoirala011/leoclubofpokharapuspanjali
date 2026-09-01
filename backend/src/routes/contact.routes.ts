import { Router } from "express";
import {
  createContact,
  listContacts,
  deleteContact,
  updateContactStatus,
} from "../controllers/contact.controller.js";
import { authenticate }              from "../middleware/authenticate.js";
import { requireRole, requirePermission } from "../middleware/authorize.js";
import { contactLimiter, apiLimiter } from "../middleware/rateLimiter.js";

const router = Router();

// ── Public ────────────────────────────────────────────────────────────────────

/**
 * @swagger
 * /contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Submit a contact form message (public — 5 per hour per IP)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Message received — admin notified and auto-reply sent
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiSuccess'
 *                 - type: object
 *                   properties:
 *                     data: { $ref: '#/components/schemas/Contact' }
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many submissions — try again later
 */
router.post("/", contactLimiter, createContact);

// ── Protected (admin / manager) ───────────────────────────────────────────────
// All routes below require a valid access-token cookie or Bearer header.

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: List all contact submissions (requires read:contacts permission)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 15, maximum: 100 }
 *     responses:
 *       200:
 *         description: Paginated contact list
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Insufficient permission
 */
router.get(
  "/",
  apiLimiter,                        // standard 100 req/15 min — not the strict contact limiter
  authenticate,
  requirePermission("read:contacts"),
  listContacts,
);

/**
 * @swagger
 * /contacts/{id}/status:
 *   patch:
 *     tags: [Contacts]
 *     summary: Mark a contact message as read, unread or archived (requires read:contacts)
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
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [unread, read, archived]
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status value
 *       404:
 *         description: Contact not found
 */
router.patch(
  "/:id/status",
  authenticate,
  requirePermission("read:contacts"),
  updateContactStatus,
);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact submission (requires delete:contacts permission)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Insufficient permission
 */
router.delete(
  "/:id",
  authenticate,
  requirePermission("delete:contacts"),
  deleteContact,
);

export default router;
