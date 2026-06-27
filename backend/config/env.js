import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (!process.env.JWT_SECRET) {
  console.warn(
    'WARNING: JWT_SECRET is not set. Using a random value — tokens will not persist across restarts. Set JWT_SECRET in your .env file.'
  );
}

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/leo-club-puspanjali',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex'),
  COOKIE_MAX_AGE: parseInt(process.env.COOKIE_MAX_AGE) || 604800000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

export default config;
