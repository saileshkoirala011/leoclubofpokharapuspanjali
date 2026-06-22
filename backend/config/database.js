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
    console.error(`\n⚠️  Database is not available. Please ensure MongoDB is running.`);
    console.error(`   - Local: mongod`);
    console.error(`   - Docker: docker run -d -p 27017:27017 mongo`);
    console.error(`   - Or use MongoDB Atlas: mongodb+srv://...`);
    console.error(`\n   The server will continue running, but database operations will fail.\n`);
    
    // Don't crash - allow server to run without DB for now
    return null;
  }
};

export default connectDB;
