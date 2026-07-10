import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

export async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () =>
    logger.info("MongoDB connected")
  );
  mongoose.connection.on("error", (err) =>
    logger.error({ err }, "MongoDB connection error")
  );
  mongoose.connection.on("disconnected", () =>
    logger.warn("MongoDB disconnected")
  );

  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected gracefully");
}
