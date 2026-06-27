import Contact from '../models/contact.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, 'All fields are required');
  }

  const contact = new Contact({
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  });

  await contact.save();
  sendCreated(res, { message: 'Message sent successfully', data: contact });
});

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  sendSuccess(res, { count: contacts.length, data: contacts });
});

export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return sendNotFound(res, 'Contact');
  sendSuccess(res, { data: contact });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'replied'].includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }
  const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!contact) return sendNotFound(res, 'Contact');
  sendSuccess(res, { message: 'Status updated', data: contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) return sendNotFound(res, 'Contact');
  sendSuccess(res, { message: 'Contact deleted' });
});
