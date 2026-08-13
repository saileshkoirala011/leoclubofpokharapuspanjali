import mongoose from "mongoose";
import { env }    from "./env.js";
import { logger } from "../utils/logger.js";

const MAX_RETRIES   = 5;
const RETRY_DELAY   = 3_000; // ms

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * connectDB — connects to MongoDB with automatic retry.
 * Retries up to MAX_RETRIES times with a fixed delay between attempts.
 */
export async function connectDB(): Promise<void> {
  mongoose.set("strictQuery", true);

  // ── Event listeners ──────────────────────────────────────────────────────
  mongoose.connection.on("connected", () =>
    logger.info("✅  MongoDB connected")
  );
  mongoose.connection.on("error", (err) =>
    logger.error({ err }, "MongoDB connection error")
  );
  mongoose.connection.on("disconnected", () =>
    logger.warn("⚠️   MongoDB disconnected")
  );
  mongoose.connection.on("reconnected", () =>
    logger.info("🔄  MongoDB reconnected")
  );

  // ── Connect with retry ────────────────────────────────────────────────────
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5_000,
        socketTimeoutMS:          45_000,
        maxPoolSize:              10,
        minPoolSize:              2,
      });
      return; // success — exit the retry loop
    } catch (err) {
      if (attempt === MAX_RETRIES) {
        logger.error({ err }, `❌  MongoDB failed after ${MAX_RETRIES} attempts`);
        throw err;
      }
      logger.warn(
        { err, attempt, nextRetryIn: `${RETRY_DELAY / 1000}s` },
        `MongoDB connection attempt ${attempt} failed — retrying…`
      );
      await sleep(RETRY_DELAY);
    }
  }
}

/**
 * disconnectDB — gracefully closes the Mongoose connection.
 */
export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  logger.info("MongoDB disconnected gracefully");
}

/**
 * isDBConnected — quick health check used by the /health endpoint.
 */
export function isDBConnected(): boolean {
  return mongoose.connection.readyState === 1; // 1 = connected
}
