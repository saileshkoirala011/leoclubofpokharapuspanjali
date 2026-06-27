import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { config } from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { sendSuccess } from '../utils/responseHelpers.js';

<<<<<<< HEAD
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

<<<<<<< HEAD
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
=======
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: config.COOKIE_MAX_AGE,
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id: user._id, email: user.email, role: user.role },
    });
  } catch (_error) {
    res.status(500).json({ success: false, message: 'Login error' });
>>>>>>> origin/devin/1782546719-security-fixes
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
