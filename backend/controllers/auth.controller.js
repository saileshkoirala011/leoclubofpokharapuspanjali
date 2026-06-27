import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { config } from '../config/env.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

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
  }
};

export const logout = (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
