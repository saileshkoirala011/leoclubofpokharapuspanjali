import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import routes from './api/routes.js';
import errorHandler from './middleware/errorHandler.js';
import sanitize from './middleware/sanitize.js';

const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts, please try again later.' },
});
app.use('/api/login', authLimiter);

// CORS
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// NoSQL injection sanitization
app.use(sanitize);

// Database connection
connectDB().then((conn) => {
  if (conn) console.log('Database connected successfully');
}).catch((err) => {
  console.error('Database connection failed:', err.message);
});

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} [${config.NODE_ENV}]`);
});

export default app;
