import { config } from '../config/env.js';

export const login = async (req, res) => {
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
    res.status(500).json({ success: false, message: 'Login error', error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
