<<<<<<< HEAD
<<<<<<< HEAD
import Contact from '../models/Contact.js';
=======
import mongoose from 'mongoose';
import Contact from '../models/contact.js';
<<<<<<< HEAD
>>>>>>> origin/devin/1782546707-improve-error-handling
=======
import Contact from '../models/Contact.js';
>>>>>>> origin/devin/1782546733-add-unit-tests

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        errors: [
          !name    && { field: 'name',    message: 'Name is required' },
          !email   && { field: 'email',   message: 'Email is required' },
          !subject && { field: 'subject', message: 'Subject is required' },
          !message && { field: 'message', message: 'Message is required' },
        ].filter(Boolean),
      });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact message saved successfully',
      data: contact,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + errors.map(e => e.message).join('; '),
        errors,
      });
    }
<<<<<<< HEAD
    res.status(500).json({ success: false, message: 'Error saving contact message', error: error.message });
=======
    console.error('createContact error:', error);
    next(error);
>>>>>>> origin/devin/1782546707-improve-error-handling
=======
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess, sendCreated, sendNotFound } from '../utils/responseHelpers.js';

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, 'All fields are required');
>>>>>>> origin/devin/1782546958-refactor-shared-utilities
  }

<<<<<<< HEAD
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('getAllContacts error:', error);
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact ID format' });
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('getContactById error:', error);
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact ID format' });
    }
    const { status } = req.body;
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, message: 'Contact status updated', data: contact });
  } catch (error) {
    console.error('updateContactStatus error:', error);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid contact ID format' });
    }
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found' });
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('deleteContact error:', error);
    next(error);
  }
};
=======
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
>>>>>>> origin/devin/1782546958-refactor-shared-utilities
