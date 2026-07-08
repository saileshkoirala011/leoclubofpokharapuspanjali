import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "production") {
  const requiredVars = ["JWT_SECRET", "MONGO_URI"];
  const missing = requiredVars.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables in production: ${missing.join(", ")}`);
  }
}

export const PORT = Number(process.env.PORT) || 5000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/leo-club";
export const JWT_SECRET = process.env.JWT_SECRET || (NODE_ENV === "production" ? "" : "dev_jwt_secret_change_me");
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
export const FRONTEND_URL = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";
