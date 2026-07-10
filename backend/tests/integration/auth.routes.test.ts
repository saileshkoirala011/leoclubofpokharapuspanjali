import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";

// ── Mock external deps before importing app ───────────────────────────────────

vi.mock("../../src/config/database.js", () => ({
  connectDB:    vi.fn().mockResolvedValue(undefined),
  disconnectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../src/config/redis.js", () => {
  const store = new Map<string, string>();
  const sets  = new Map<string, Set<string>>();
  const redis = {
    setex:    vi.fn((k: string, _: number, v: string) => { store.set(k, v); return Promise.resolve("OK"); }),
    get:      vi.fn((k: string) => Promise.resolve(store.get(k) ?? null)),
    del:      vi.fn((...keys: string[]) => { keys.forEach((k) => store.delete(k)); return Promise.resolve(1); }),
    sadd:     vi.fn((k: string, ...v: string[]) => { if (!sets.has(k)) sets.set(k, new Set()); v.forEach((i) => sets.get(k)!.add(i)); return Promise.resolve(1); }),
    srem:     vi.fn(() => Promise.resolve(1)),
    smembers: vi.fn((k: string) => Promise.resolve([...(sets.get(k) ?? [])])),
    expire:   vi.fn(() => Promise.resolve(1)),
    pipeline: vi.fn(() => ({ del: vi.fn().mockReturnThis(), exec: vi.fn().mockResolvedValue([]) })),
    quit:     vi.fn().mockResolvedValue(undefined),
    _store: store,
  };
  return { getRedis: vi.fn(() => redis), disconnectRedis: vi.fn() };
});

vi.mock("../../src/config/env.js", () => ({
  env: {
    NODE_ENV:                   "test",
    PORT:                       5001,
    MONGODB_URI:                "mongodb://localhost/test",
    REDIS_URL:                  "redis://localhost",
    JWT_ACCESS_SECRET:          "test_access_secret_that_is_at_least_32_chars!",
    JWT_REFRESH_SECRET:         "test_refresh_secret_that_is_at_least_32_chars!",
    JWT_ACCESS_EXPIRES_IN:      "15m",
    JWT_REFRESH_EXPIRES_IN:     "7d",
    CSRF_SECRET:                "test_csrf_secret_that_is_at_least_32_chars!!",
    FRONTEND_URL:               "http://localhost:5173",
    SMTP_HOST:                  "smtp.ethereal.email",
    SMTP_PORT:                  587,
    SMTP_USER:                  "",
    SMTP_PASS:                  "",
    SMTP_FROM:                  "noreply@test.com",
    BCRYPT_ROUNDS:              4,
    MAX_LOGIN_ATTEMPTS:         5,
    LOCKOUT_DURATION_MINUTES:   15,
    RESET_TOKEN_EXPIRES_MINUTES: 60,
  },
}));

// Mock email so no real SMTP calls happen
vi.mock("../../src/services/email.service.js", () => ({
  emailService: {
    sendVerification:    vi.fn().mockResolvedValue(undefined),
    sendPasswordReset:   vi.fn().mockResolvedValue(undefined),
    sendPasswordChanged: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock mongoose User model
vi.mock("../../src/models/user.model.js", () => {
  const users = new Map<string, Record<string, unknown>>();
  let idCounter = 1;

  const makeId = () => String(idCounter++);

  const User = vi.fn().mockImplementation((data: Record<string, unknown>) => ({
    ...data,
    _id:               { toString: () => data._id as string ?? makeId() },
    isEmailVerified:   false,
    isActive:          true,
    loginAttempts:     0,
    lockUntil:         null,
    passwordResetToken: null,
    emailVerifyToken:  null,
    createdAt:         new Date(),
    updatedAt:         new Date(),
    comparePassword:   vi.fn().mockResolvedValue(true),
    isLocked:          vi.fn().mockReturnValue(false),
    incLoginAttempts:  vi.fn().mockResolvedValue(undefined),
    resetLoginAttempts: vi.fn().mockResolvedValue(undefined),
    save:              vi.fn().mockResolvedValue(undefined),
    toJSON:            function() { return { ...this, password: undefined }; },
  }));

  (User as unknown as Record<string, unknown>).create = vi.fn().mockImplementation((data: Record<string, unknown>) => {
    const id  = makeId();
    const doc = { ...data, _id: { toString: () => id }, isEmailVerified: false, isActive: true,
      loginAttempts: 0, lockUntil: null, comparePassword: vi.fn().mockResolvedValue(true),
      isLocked: vi.fn().mockReturnValue(false), incLoginAttempts: vi.fn(), resetLoginAttempts: vi.fn(),
      toJSON: function() { return { ...this, password: undefined }; },
    };
    users.set(id, doc);
    return Promise.resolve(doc);
  });

  (User as unknown as Record<string, unknown>).findOne = vi.fn().mockImplementation(() => ({
    select: vi.fn().mockReturnThis(),
    exec:   vi.fn().mockResolvedValue(null),
  }));

  (User as unknown as Record<string, unknown>).findById = vi.fn().mockReturnValue({
    select: vi.fn().mockReturnThis(),
    exec:   vi.fn().mockResolvedValue(null),
  });

  (User as unknown as Record<string, unknown>).exists = vi.fn().mockResolvedValue(null);

  return { User };
});

// ── Import app AFTER all mocks ────────────────────────────────────────────────
// We import express app without starting the server
import express from "express";
import cors    from "cors";
import helmet  from "helmet";
import cookieParser from "cookie-parser";
import routes  from "../../src/routes/index.js";
import { notFound }    from "../../src/middleware/notFound.js";
import { errorHandler } from "../../src/middleware/errorHandler.js";

const testApp = express();
testApp.use(helmet({ contentSecurityPolicy: false }));
testApp.use(cors({ origin: true, credentials: true }));
testApp.use(express.json());
testApp.use(cookieParser());
testApp.use("/api", routes);
testApp.use(notFound);
testApp.use(errorHandler);

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("Auth Routes — POST /api/auth/register", () => {

  const VALID_USER = {
    name:     "Test User",
    email:    "test@example.com",
    password: "StrongP@ss1",
  };

  it("returns 400 when name is missing", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ email: "a@b.com", password: "StrongP@ss1" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("returns 400 for invalid email", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ name: "Test", email: "bad-email", password: "StrongP@ss1" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for a weak password (no uppercase)", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ name: "Test", email: "a@b.com", password: "weakpass1!" });
    expect(res.status).toBe(400);
    expect(JSON.stringify(res.body)).toContain("uppercase");
  });

  it("returns 400 for a weak password (no number)", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send({ name: "Test", email: "a@b.com", password: "NoNumbers!!" });
    expect(res.status).toBe(400);
  });

  it("returns 201 with user + accessToken on valid input", async () => {
    const res = await request(testApp)
      .post("/api/auth/register")
      .send(VALID_USER);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.accessToken).toBeDefined();
  });
});

describe("Auth Routes — POST /api/auth/login", () => {

  it("returns 400 for missing email", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ password: "StrongP@ss1" });
    expect(res.status).toBe(400);
  });

  it("returns 400 for missing password", async () => {
    const res = await request(testApp)
      .post("/api/auth/login")
      .send({ email: "a@b.com" });
    expect(res.status).toBe(400);
  });
});

describe("Auth Routes — POST /api/auth/forgot-password", () => {

  it("always returns 200 regardless of email existence", async () => {
    const res = await request(testApp)
      .post("/api/auth/forgot-password")
      .send({ email: "anyone@example.com" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("returns 400 for invalid email format", async () => {
    const res = await request(testApp)
      .post("/api/auth/forgot-password")
      .send({ email: "not-an-email" });
    expect(res.status).toBe(400);
  });
});

describe("Auth Routes — GET /api/auth/profile (unauthenticated)", () => {

  it("returns 401 without a token", async () => {
    const res = await request(testApp).get("/api/auth/profile");
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

describe("Auth Routes — 404", () => {

  it("returns 404 for unknown routes", async () => {
    const res = await request(testApp).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
