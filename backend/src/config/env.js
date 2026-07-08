import dotenv from "dotenv";
dotenv.config();

export const NODE_ENV    = process.env.NODE_ENV    || "development";
export const PORT        = Number(process.env.PORT) || 5000;
export const MONGO_URI   = process.env.MONGO_URI   || "mongodb://127.0.0.1:27017/leoclub";
export const FRONTEND_URL = process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173";

export const JWT_SECRET         = process.env.JWT_SECRET         || (NODE_ENV === "production" ? "" : "dev_secret_change_me");
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (NODE_ENV === "production" ? "" : "dev_refresh_secret_change_me");
export const JWT_EXPIRES_IN     = process.env.JWT_EXPIRES_IN     || "15m";

// Fail fast in production if critical vars are missing
if (NODE_ENV === "production") {
  const required = ["JWT_SECRET", "JWT_REFRESH_SECRET", "MONGO_URI", "FRONTEND_URL"];
  const missing  = required.filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}
