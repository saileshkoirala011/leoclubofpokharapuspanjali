import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import routes      from "./routes/index.js";
import notFound    from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import sanitize    from "./middleware/sanitize.js";
import { FRONTEND_URL, NODE_ENV } from "./config/env.js";

const app = express();

app.disable("x-powered-by");

// Trust proxy only in production (Nginx / Vercel / Railway)
if (NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// ── Security headers ──────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:4173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Handle preflight for all routes
app.options("/{*path}", cors(corsOptions));

// ── Rate limiting (custom — avoids Express 5 req.query getter conflict) ───────
const makeRateLimiter = (max, windowMs, message) => {
  const hits = new Map();
  return (req, res, next) => {
    const key = req.ip || req.socket?.remoteAddress || "unknown";
    const now = Date.now();
    const entry = hits.get(key) || { count: 0, start: now };
    if (now - entry.start > windowMs) { entry.count = 0; entry.start = now; }
    entry.count++;
    hits.set(key, entry);
    if (entry.count > max) return res.status(429).json({ success: false, message });
    next();
  };
};

const limiter     = makeRateLimiter(100, 15 * 60 * 1000, "Too many requests, please try again later.");
const authLimiter = makeRateLimiter(20,  15 * 60 * 1000, "Too many login attempts, please try again later.");

// ── Body parsing & utilities ──────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));
app.use(sanitize);

// ── Rate limiters (after body parsing) ───────────────────────────────────────
app.use(limiter);
app.use("/api/auth", authLimiter);

// ── Static files ──────────────────────────────────────────────────────────────
app.use("/public", express.static("public"));

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Leo Club API is running",
    env: NODE_ENV,
  });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── 404 & error handlers ─────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
