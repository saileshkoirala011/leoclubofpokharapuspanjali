import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelpers.js";
import { createContact, getContacts } from "../services/contact.service.js";

// POST /api/contacts
export const submitContact = asyncHandler(async (req, res) => {
  const contact = await createContact(req.body);
  return sendSuccess(res, contact, "Message received. We'll get back to you soon.", 201);
});

// GET /api/contacts  (admin only)
export const listContacts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const sort = req.query.sort || "-createdAt";

  const result = await getContacts({ page, limit, sort });
  return sendSuccess(res, result, "Contacts retrieved");
});
