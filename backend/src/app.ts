import express          from "express";
import cors             from "cors";
import helmet           from "helmet";
import cookieParser     from "cookie-parser";
import hpp              from "hpp";
import { doubleCsrf }   from "csrf-csrf";
import swaggerUi        from "swagger-ui-express";

import { env }           from "./config/env.js";
import { connectDB, isDBConnected } from "./config/database.js";
import { disconnectRedis, isRedisAvailable } from "./config/redis.js";
import { logger }        from "./utils/logger.js";
import { swaggerSpec }   from "./config/swagger.js";

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
    contentSecurityPolicy: {
      directives: {
        defaultSrc:     ["'self'"],
        scriptSrc:      ["'self'"],
        styleSrc:       ["'self'", "'unsafe-inline'"],   // swagger-ui needs inline styles
        imgSrc:         ["'self'", "data:", "https:"],
        connectSrc:     ["'self'", env.FRONTEND_URL],
        fontSrc:        ["'self'", "https:", "data:"],
        objectSrc:      ["'none'"],
        mediaSrc:       ["'none'"],
        frameSrc:       ["'none'"],
        upgradeInsecureRequests: env.NODE_ENV === "production" ? [] : null,
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: (origin, cb) => {
      const allowed = [
        env.FRONTEND_URL,
        "https://leoclubofpokharapuspanjali.app",
        "https://www.leoclubofpokharapuspanjali.app",
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
    allowedHeaders:  ["Content-Type", "Authorization", "x-csrf-token"],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ── Security middlewares ──────────────────────────────────────────────────────
app.use((req, _res, next) => {
  const sanitize = (value: unknown): unknown => {
    if (!value || typeof value !== "object") return value;

    if (Array.isArray(value)) {
      return value.map(sanitize);
    }

    const clone: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      const cleanKey = key.replace(/^\$+|\./g, "");
      if (cleanKey && !cleanKey.startsWith("$")) {
        clone[cleanKey] = sanitize(item);
      }
    }
    return clone;
  };

  if (req.body && typeof req.body === "object") req.body = sanitize(req.body) as typeof req.body;
  if (req.query && typeof req.query === "object") {
    Object.keys(req.query).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) delete (req.query as Record<string, unknown>)[key];
    });
  }
  if (req.params && typeof req.params === "object") {
    Object.keys(req.params).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) delete (req.params as Record<string, unknown>)[key];
    });
  }
  next();
});
app.use(hpp());

// ── CSRF protection ───────────────────────────────────────────────────────────
// Uses the double-submit cookie pattern. The client reads the CSRF token from
// the `x-csrf-token` response header on GET /api/csrf-token and sends it back
// as the `x-csrf-token` request header on all mutating requests.
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret:    () => env.CSRF_SECRET,
  cookieName:   "__Host-psifi.x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
    secure:   env.NODE_ENV === "production",
    path:     "/",
  },
  getTokenFromRequest: (req) =>
    (req.headers["x-csrf-token"] as string | undefined) ?? "",
});

// Expose a token-fetch endpoint (used by the frontend before first mutation)
app.get("/api/csrf-token", (req, res) => {
  const token = generateToken(req, res);
  res.json({ csrfToken: token });
});

// Apply CSRF validation to all state-changing routes EXCEPT public endpoints
app.use("/api", (req, res, next) => {
  // The public contact form is rate-limited and doesn't need CSRF protection
  // (no auth cookies at stake). Skip CSRF for this route only.
  if (req.method === "POST" && req.path === "/contacts") return next();
  return doubleCsrfProtection(req, res, next);
});

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(requestLogger);

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use(apiLimiter);

// ── API docs (Swagger UI) ─────────────────────────────────────────────────────
// Only available in non-production unless you want it publicly accessible
if (env.NODE_ENV !== "production") {
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Leo Club API Docs",
      swaggerOptions: { persistAuthorization: true },
    })
  );
  logger.info("Swagger UI available at /api/docs");
}

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Leo Club Auth API is running", env: env.NODE_ENV });
});

app.get("/health", (_req, res) => {
  const db    = isDBConnected();
  const redis = isRedisAvailable();
  const healthy = db; // Redis is optional — DB is the critical dependency
  res.status(healthy ? 200 : 503).json({
    success: healthy,
    status:  healthy ? "healthy" : "degraded",
    db:      db    ? "connected"    : "disconnected",
    redis:   redis ? "connected"    : "unavailable",
    uptime:  Math.floor(process.uptime()),
    ts:      new Date().toISOString(),
  });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api", routes);

// ── 404 + error handlers ─────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Bootstrap (only when run directly, not when imported by tests) ────────────

const PORT = env.PORT;

async function start(): Promise<void> {
  await connectDB();

  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} [${env.NODE_ENV}]`);
  });

  const shutdown = async (signal: string): Promise<void> => {
    logger.info(`${signal} received — shutting down`);
    server.close(async () => {
      await disconnectRedis();
      logger.info("Server closed");
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));
}

// Only start the server when this file is executed directly (not imported by tests)
const isMain = process.argv[1]?.endsWith("app.js") ||
               process.argv[1]?.endsWith("app.ts");

if (isMain) {
  start().catch((err) => {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  });
}

export default app;
