import type { Request, Response } from "express";
import { asyncHandler }  from "../utils/asyncHandler.js";
import { sendSuccess }   from "../utils/ApiResponse.js";
import { ApiError }      from "../utils/ApiError.js";
import { Contact }       from "../models/Contact.js";
import { emailService }  from "../services/email.service.js";
import { env }           from "../config/env.js";
import { z }             from "zod";

// ── Validation schemas ────────────────────────────────────────────────────────

const createContactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(100).trim(),
  email:   z.string().email("Enter a valid email address").toLowerCase().trim(),
  subject: z.string().min(3, "Subject must be at least 3 characters").max(200).trim(),
  message: z.string().min(5, "Message must be at least 5 characters").max(5000).trim(),
});

const listContactsSchema = z.object({
  page:  z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(15),
});

// ── Admin notification address ────────────────────────────────────────────────
// Falls back to SMTP_USER (the club's own sending address) when not explicitly
// set so the inbox receiving contact form submissions is always the club email.

const adminContactEmail = (): string =>
  env.ADMIN_CONTACT_EMAIL ?? env.SMTP_USER ?? "leoclubpokharapuspanjali@gmail.com";

// ── Controllers ───────────────────────────────────────────────────────────────

/** POST /api/contacts — public, rate-limited, CSRF-exempt */
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
    req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ??
    req.socket?.remoteAddress ??
    null
  );

  // 1 — Persist to database
  const contact = await Contact.create({ name, email, subject, message, ip });

  // 2 — Notify the club (non-blocking — failure never rejects the request)
  void emailService.sendContactNotification(
    adminContactEmail(),
    name,
    email,
    subject,
    message,
  );

  // 3 — Auto-reply to the submitter (non-blocking)
  void emailService.sendContactAutoReply(email, name, subject);

  sendSuccess(res, contact, "Message sent successfully", 201);
});

/** GET /api/contacts — requires authenticate + read:contacts permission */
export const listContacts = asyncHandler(async (req: Request, res: Response) => {
  const parsed = listContactsSchema.safeParse(req.query);
  if (!parsed.success) throw ApiError.badRequest("Invalid pagination parameters");

  const { page, limit } = parsed.data;
  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Contact.countDocuments(),
  ]);

  sendSuccess(res, {
    contacts,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  }, "Contacts retrieved");
});

/** DELETE /api/contacts/:id — requires authenticate + delete:contacts permission */
export const deleteContact = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) throw ApiError.notFound("Contact not found");
  sendSuccess(res, null, "Contact deleted");
});

/** PATCH /api/contacts/:id/status — requires authenticate + read:contacts permission */
export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = z.object({
    status: z.enum(["unread", "read", "archived"]),
  }).safeParse(req.body);

  if (!parsed.success) throw ApiError.badRequest("status must be one of: unread, read, archived");

  const updated = await Contact.findByIdAndUpdate(
    id,
    { status: parsed.data.status },
    { new: true, runValidators: true },
  );
  if (!updated) throw ApiError.notFound("Contact not found");
  sendSuccess(res, updated, "Status updated");
});
