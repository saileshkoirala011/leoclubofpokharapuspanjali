import express from 'express';
import { login, logout } from '../controllers/auth.controller.js';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from '../controllers/contact.controller.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' });
});

// Auth routes (public)
router.post('/login', login);
router.post('/logout', logout);

// Contact routes
router.post('/contacts', createContact); // Public: anyone can submit a contact form
router.get('/contacts', authenticate, getAllContacts); // Admin only
router.get('/contacts/:id', authenticate, getContactById);
router.put('/contacts/:id', authenticate, updateContactStatus);
router.delete('/contacts/:id', authenticate, deleteContact);

// User routes (all protected)
router.get('/users', authenticate, getAllUsers);
router.get('/users/:id', authenticate, getUserById);
router.put('/users/:id', authenticate, updateUser);
router.delete('/users/:id', authenticate, deleteUser);

export default router;
