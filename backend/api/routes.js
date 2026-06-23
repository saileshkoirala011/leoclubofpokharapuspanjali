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

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running', timestamp: new Date() });
});

// Auth routes
router.post('/login', login);
router.post('/logout', logout);

// Contact routes
router.post('/contacts', createContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
