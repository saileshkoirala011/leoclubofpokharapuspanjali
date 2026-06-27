import mongoose from 'mongoose';
import { config } from './env.js';

const connectDB = async () => {
  const mongoURI = config.MONGODB_URI;
  console.log(`Attempting to connect to MongoDB: ${mongoURI}`);
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
<<<<<<< HEAD
    console.error(`✗ MongoDB Connection Failed: ${error.message}`);
    console.error(`\n⚠️  Make sure MongoDB is running. Start it with: mongod\n`);
=======
    const conn = await mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
>>>>>>> origin/devin/1782546719-security-fixes
    return null;
=======
    console.error(`MongoDB Connection Failed: ${error.message}`);
    console.error('Make sure MongoDB is running locally or update MONGODB_URI in .env');
    throw error;
>>>>>>> origin/devin/1782546707-improve-error-handling
  }
};

export default connectDB;