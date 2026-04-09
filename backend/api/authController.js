import User from '../models/User.js';
import { config } from '../config/env.js';
import { hashPassword, verifyPassword } from '../services/passwordService.js';
import { createAccessToken } from '../services/tokenService.js';

const setAuthCookie = (res, token) => {
  res.cookie('authToken', token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: Number(config.COOKIE_MAX_AGE),
  });
};

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'name, email and password are required' });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }

  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: hashPassword(password),
    role: role === 'admin' ? 'admin' : 'user',
  });

  const token = createAccessToken({
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  setAuthCookie(res, token);

  return res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  user.lastLoginAt = new Date();
  await user.save();

  const token = createAccessToken({
    userId: user._id.toString(),
    role: user.role,
    email: user.email,
  });

  setAuthCookie(res, token);

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

export const logout = async (_req, res) => {
  res.clearCookie('authToken');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};
