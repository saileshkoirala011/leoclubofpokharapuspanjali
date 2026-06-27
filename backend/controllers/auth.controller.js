import { config } from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/responseHelpers.js';

<<<<<<< HEAD
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // TODO: Replace with real DB lookup + bcrypt compare
    if (username === 'admin' && password === 'admin123') {
      const token = 'mock-token-' + Date.now();
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: config.COOKIE_MAX_AGE,
      });
      return res.status(200).json({ success: true, message: 'Login successful', token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error('login error:', error);
    next(error);
=======
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required');
>>>>>>> origin/devin/1782546958-refactor-shared-utilities
  }

  // TODO: Replace with real DB lookup + bcrypt compare
  if (username === 'admin' && password === 'admin123') {
    const token = 'mock-token-' + Date.now();
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: config.COOKIE_MAX_AGE,
    });
    return sendSuccess(res, { message: 'Login successful', token });
  }

  throw new ApiError(401, 'Invalid credentials');
});

export const logout = (req, res) => {
  res.clearCookie('authToken');
  sendSuccess(res, { message: 'Logged out successfully' });
};
