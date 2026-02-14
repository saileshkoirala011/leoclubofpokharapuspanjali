import express from 'express';
import { config } from '../config/env.js';
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
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock authentication
  if (username && password) {
    const token = 'mock-jwt-token-' + Date.now();
    
    // Set cookie with token
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

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
