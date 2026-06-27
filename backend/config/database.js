import mongoose from 'mongoose';
import { config } from './env.js';

const connectDB = async () => {
  try {
    const mongoURI = config.MONGODB_URI;
    console.log(`Attempting to connect to MongoDB: ${mongoURI}`);
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ MongoDB Connection Failed: ${error.message}`);
    console.error(`\n⚠️  Make sure MongoDB is running. Start it with: mongod\n`);
    return null;
  }
};

export default connectDB;