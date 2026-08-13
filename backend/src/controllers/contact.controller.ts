import type { Request, Response } from "express";
import { asyncHandler }  from "../utils/asyncHandler.js";
import { sendSuccess }   from "../utils/ApiResponse.js";
import { ApiError }      from "../utils/ApiError.js";
import { Contact }       from "../models/Contact.js";
import { emailService }  from "../services/email.service.js";
import { env }           from "../config/env.js";
import { z }             from "zod";

// ── Validation schema ─────────────────────────────────────────────────────────

const createContactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email:   z.string().email("Enter a valid email address").toLowerCase().trim(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200).trim(),
  message: z.string().min(5, "Message must be at least 5 characters").max(5000).trim(),
});

// ── Admin notification address ────────────────────────────────────────────────

const ADMIN_EMAIL = "leoclubpokharapuspanjali@gmail.com";

// ── Controllers ───────────────────────────────────────────────────────────────

/** POST /api/contacts — public */
export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const parsed = createContactSchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.errors.map((e) => ({
      field:   e.path.join("."),
      message: e.message,
    }));
    throw ApiError.badRequest("Validation failed", details);
  }

  const { name, email, subject, message } = parsed.data;

  const ip = (
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ??
    req.socket?.remoteAddress ??
    null
  );

  // 1 — Save to database
  const contact = await Contact.create({ name, email, subject, message, ip });

  // 2 — Notify the club (non-blocking — never fails the request)
  void emailService.sendContactNotification(
    ADMIN_EMAIL,
    name,
    email,
    subject,
    message,
  );

  // 3 — Send auto-reply to the person who submitted (non-blocking)
  void emailService.sendContactAutoReply(email, name, subject);

  sendSuccess(res, contact, "Message sent successfully", 201);
});

/** GET /api/contacts — admin only */
export const listContacts = asyncHandler(async (req: Request, res: Response) => {
  const page  = Math.max(1,   parseInt(String(req.query["page"]  ?? 1)));
  const limit = Math.min(100, parseInt(String(req.query["limit"] ?? 15)));
  const skip  = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    Contact.find().sort("-createdAt").skip(skip).limit(limit).lean(),
    Contact.countDocuments(),
  ]);

  sendSuccess(res, {
    contacts,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  }, "Contacts retrieved");
});

/** DELETE /api/contacts/:id — admin only */
export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const id      = req.params.id;
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) throw ApiError.notFound("Contact not found");
  sendSuccess(res, null, "Contact deleted");
});
