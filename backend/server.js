import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import routes from './api/routes.js';
import errorHandler from './middleware/errorHandler.js';

console.log('Starting backend server...');

const app = express();

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB().then((conn) => {
  if (conn) console.log('✓ Database connected successfully');
}).catch((err) => {
  console.error('✗ Database connection failed:', err.message);
});

app.use('/api', routes);
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
  console.log(`✓ Environment: ${config.NODE_ENV}`);
  console.log(`✓ Frontend URL: ${config.FRONTEND_URL}`);
});

export default app;
