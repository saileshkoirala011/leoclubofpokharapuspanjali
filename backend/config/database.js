import mongoose from 'mongoose';
import { config } from './env.js';

const connectDB = async () => {
  const mongoURI = config.MONGODB_URI;
  console.log(`Attempting to connect to MongoDB: ${mongoURI}`);
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    console.error('Make sure MongoDB is running locally or update MONGODB_URI in .env');
    throw error;
  }
};

export default connectDB;
