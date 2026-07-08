import Contact from "../models/Contact.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHelpers.js";

export const submitContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  return sendSuccess(res, contact, "Contact message received", 201);
});

export const listContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return sendSuccess(res, contacts, "Contacts retrieved");
});
