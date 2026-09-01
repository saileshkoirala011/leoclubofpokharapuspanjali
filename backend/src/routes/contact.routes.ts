import { Router } from "express";
import { createContact, listContacts, deleteContact } from "../controllers/contact.controller.js";
import { authenticate }   from "../middleware/authenticate.js";
import { requireRole }    from "../middleware/authorize.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = Router();

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
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ApiError' }
 *       429:
 *         description: Too many submissions — try again later
 */
router.post("/", contactLimiter, createContact);

/**
 * @swagger
 * /contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: List all contact submissions (admin only, paginated)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 15, maximum: 100 }
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Paginated contact list
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
 *                         contacts:
 *                           type: array
 *                           items: { $ref: '#/components/schemas/Contact' }
 *                         pagination: { $ref: '#/components/schemas/Pagination' }
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Insufficient role
 */
router.get("/", authenticate, requireRole("admin"), listContacts);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact submission (admin only)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: Contact document ID
 *     responses:
 *       200:
 *         description: Contact deleted
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Insufficient role
 */
router.delete("/:id", authenticate, requireRole("admin"), deleteContact);

export default router;
