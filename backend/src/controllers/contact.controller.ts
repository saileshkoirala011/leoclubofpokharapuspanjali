import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess }  from "../utils/ApiResponse.js";
import { ApiError }     from "../utils/ApiError.js";
import { Contact }      from "../models/Contact.js";
import { z }            from "zod";

// ── Validation schema ─────────────────────────────────────────────────────────

const createContactSchema = z.object({
  name:    z.string().min(2).max(100).trim(),
  email:   z.string().email().toLowerCase().trim(),
  subject: z.string().min(3).max(200).trim(),
  message: z.string().min(5).max(5000).trim(),
});

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

  const ip = (
    req.headers["x-forwarded-for"]?.toString().split(",")[0] ??
    req.socket?.remoteAddress ??
    null
  );

  const contact = await Contact.create({ ...parsed.data, ip });
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
  const id = req.params["id"];
  const deleted = await Contact.findByIdAndDelete(id);
  if (!deleted) throw ApiError.notFound("Contact not found");
  sendSuccess(res, null, "Contact deleted");
});
