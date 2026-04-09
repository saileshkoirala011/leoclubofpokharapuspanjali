import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from './contactController.js';
import {
  createTeam,
  getAllTeam,
  getTeamById,
  updateTeam,
  deleteTeam,
} from './teamController.js';
import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from './galleryController.js';
import {
  createAbout,
  getAllAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
} from './aboutController.js';
import { login, logout, register } from './authController.js';
import { getUserAnalytics, getUsers, opsetUser } from './userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date(),
  });
});

router.get('/data', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      message: 'Sample data from backend',
      cookies: req.cookies,
    },
  });
});

// Authentication routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

// User routes
router.get('/users', authenticate, authorize('admin'), getUsers);
router.post('/users/opset', authenticate, authorize('admin'), opsetUser);
router.get('/users/analytics', authenticate, authorize('admin'), getUserAnalytics);

// Contact routes
router.post('/contacts', createContact);
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

// Team routes
router.post('/team', createTeam);
router.get('/team', getAllTeam);
router.get('/team/:id', getTeamById);
router.put('/team/:id', updateTeam);
router.delete('/team/:id', deleteTeam);

// Gallery routes
router.post('/gallery', createGallery);
router.get('/gallery', getAllGallery);
router.get('/gallery/:id', getGalleryById);
router.put('/gallery/:id', updateGallery);
router.delete('/gallery/:id', deleteGallery);

// About routes
router.post('/about', createAbout);
router.get('/about', getAllAbout);
router.get('/about/:id', getAboutById);
router.put('/about/:id', updateAbout);
router.delete('/about/:id', deleteAbout);

export default router;
