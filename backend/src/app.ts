import express          from "express";
import cors             from "cors";
import helmet           from "helmet";
import cookieParser     from "cookie-parser";
import mongoSanitize    from "express-mongo-sanitize";
import hpp              from "hpp";

import { env }           from "./config/env.js";
import { connectDB }     from "./config/database.js";
import { disconnectRedis } from "./config/redis.js";
import { logger }        from "./utils/logger.js";

import { requestLogger } from "./middleware/requestLogger.js";
import { apiLimiter }    from "./middleware/rateLimiter.js";
import { notFound }      from "./middleware/notFound.js";
import { errorHandler }  from "./middleware/errorHandler.js";

import routes            from "./routes/index.js";

// ── App ───────────────────────────────────────────────────────────────────────

const app = express();

app.disable("x-powered-by");
if (env.NODE_ENV === "production") app.set("trust proxy", 1);

// ── Security headers ──────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy:      false,
    crossOriginResourcePolicy:  { policy: "cross-origin" },
  })
);

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [
        env.FRONTEND_URL,
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://localhost:4173",
        "http://127.0.0.1:5173",
      ];
      if (!origin || allowed.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials:     true,
    methods:         ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders:  ["Content-Type", "Authorization"],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ── Security middlewares ──────────────────────────────────────────────────────
app.use(mongoSanitize());   // strip $ and . from user input
app.use(hpp());             // prevent HTTP parameter pollution

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(requestLogger);

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use(apiLimiter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Leo Club Auth API is running", env: env.NODE_ENV });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── 404 + error handlers ─────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const PORT = env.PORT;

async function start(): Promise<void> {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} [${env.NODE_ENV}]`);
  });

  // ── Graceful shutdown ───────────────────────────────────────────────────────
  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received — shutting down`);
    server.close(async () => {
      await disconnectRedis();
      logger.info("Server closed");
      process.exit(0);
    });
    // Force exit after 10 s
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));
}

start().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});

export default app;
