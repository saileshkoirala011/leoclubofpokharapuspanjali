import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("MONGO_URI is required in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;