import { Router } from "express";
import { createContact, listContacts, deleteContact } from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireRole }  from "../middleware/authorize.js";
import { apiLimiter }   from "../middleware/rateLimiter.js";

const router = Router();

/** POST /api/contacts — public, rate-limited */
router.post("/", apiLimiter, createContact);

/** GET /api/contacts — admin only */
router.get("/", authenticate, requireRole("admin"), listContacts);

/** DELETE /api/contacts/:id — admin only */
router.delete("/:id", authenticate, requireRole("admin"), deleteContact);

export default router;
