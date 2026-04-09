import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import routes from './api/routes.js';
import errorHandler from './middleware/errorHandler.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { startQueueWorker } from './services/queueService.js';

console.log('Starting backend server...');

const app = express();

// Enable reverse-proxy awareness for load balancers / ingress
app.set('trust proxy', 1);

// Middleware
app.use(securityHeaders);
app.use(rateLimiter({ windowMs: 60_000, maxRequests: 120 }));
app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Connect to Database
connectDB().then(() => {
  console.log('✓ Database connected successfully');
  startQueueWorker();
}).catch((err) => {
  console.error('✗ Database connection failed:', err.message);
});

// Routes - mount all API routes under /api
app.use('/api', routes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});

export default app;
