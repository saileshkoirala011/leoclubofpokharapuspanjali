import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authenticate;
