import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import routes from './api/routes.js';
import errorHandler from './middleware/errorHandler.js';

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

console.log('Starting backend server...');

const app = express();

app.use(cors({
  origin: config.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to database. Server will not start.', err.message);
    process.exit(1);
  }

  const PORT = config.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Frontend URL: ${config.FRONTEND_URL}`);
  });
};

startServer();

export default app;
