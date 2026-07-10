import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import jwt from "jsonwebtoken";

// ── Mock Redis before importing the service ───────────────────────────────────
vi.mock("../../src/config/redis.js", () => {
  const store = new Map<string, string>();
  const sets  = new Map<string, Set<string>>();

  const redis = {
    setex:    vi.fn((k: string, _ttl: number, v: string) => { store.set(k, v); return Promise.resolve("OK"); }),
    get:      vi.fn((k: string) => Promise.resolve(store.get(k) ?? null)),
    del:      vi.fn((...keys: string[]) => { keys.forEach((k) => store.delete(k)); return Promise.resolve(keys.length); }),
    sadd:     vi.fn((k: string, ...v: string[]) => {
      if (!sets.has(k)) sets.set(k, new Set());
      v.forEach((i) => sets.get(k)!.add(i));
      return Promise.resolve(v.length);
    }),
    srem:     vi.fn((k: string, ...v: string[]) => {
      v.forEach((i) => sets.get(k)?.delete(i));
      return Promise.resolve(v.length);
    }),
    smembers: vi.fn((k: string) => Promise.resolve([...( sets.get(k) ?? [])])),
    expire:   vi.fn(() => Promise.resolve(1)),
    pipeline: vi.fn(() => ({
      del:    vi.fn().mockReturnThis(),
      exec:   vi.fn().mockResolvedValue([]),
    })),
    _store: store,
    _sets:  sets,
  };

  return { getRedis: vi.fn(() => redis), disconnectRedis: vi.fn() };
});

// ── Mock env ──────────────────────────────────────────────────────────────────
vi.mock("../../src/config/env.js", () => ({
  env: {
    JWT_ACCESS_SECRET:      "test_access_secret_that_is_at_least_32_chars!",
    JWT_REFRESH_SECRET:     "test_refresh_secret_that_is_at_least_32_chars!",
    JWT_ACCESS_EXPIRES_IN:  "15m",
    JWT_REFRESH_EXPIRES_IN: "7d",
    NODE_ENV:               "test",
  },
}));

import { JwtService }         from "../../src/services/jwt.service.js";
import { getRedis }           from "../../src/config/redis.js";

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("JwtService", () => {
  let svc: JwtService;

  beforeEach(() => {
    svc = new JwtService();
    vi.clearAllMocks();
    (getRedis() as ReturnType<typeof getRedis> & { _store: Map<string,string>; _sets: Map<string,Set<string>> })._store.clear();
    (getRedis() as ReturnType<typeof getRedis> & { _store: Map<string,string>; _sets: Map<string,Set<string>> })._sets.clear();
  });

  // ── signAccess ──────────────────────────────────────────────────────────────

  describe("signAccess", () => {
    it("returns a valid JWT string", () => {
      const token = svc.signAccess({ sub: "user123", email: "a@b.com", role: "user" });
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("embeds the correct claims", () => {
      const token   = svc.signAccess({ sub: "u1", email: "x@y.com", role: "admin" });
      const payload = jwt.decode(token) as Record<string, unknown>;
      expect(payload.sub).toBe("u1");
      expect(payload.email).toBe("x@y.com");
      expect(payload.role).toBe("admin");
      expect(typeof payload.jti).toBe("string");
    });
  });

  // ── verifyAccess ────────────────────────────────────────────────────────────

  describe("verifyAccess", () => {
    it("verifies a freshly-signed token", () => {
      const token   = svc.signAccess({ sub: "u1", email: "a@b.com", role: "user" });
      const payload = svc.verifyAccess(token);
      expect(payload.sub).toBe("u1");
    });

    it("throws ApiError on invalid token", () => {
      expect(() => svc.verifyAccess("bad.token.here")).toThrow();
    });

    it("throws ApiError on expired token", () => {
      const expired = jwt.sign(
        { sub: "u1", email: "a@b.com", role: "user", jti: "x" },
        "test_access_secret_that_is_at_least_32_chars!",
        { expiresIn: -1 },
      );
      expect(() => svc.verifyAccess(expired)).toThrow();
    });
  });

  // ── signRefresh / verifyRefresh ─────────────────────────────────────────────

  describe("signRefresh + verifyRefresh", () => {
    it("signs a refresh token and stores it in Redis", async () => {
      const { token } = await svc.signRefresh("user123");
      expect(typeof token).toBe("string");
      expect(getRedis().setex).toHaveBeenCalled();
    });

    it("verifyRefresh returns the payload and rotates the token", async () => {
      const { token } = await svc.signRefresh("user123");
      const payload   = await svc.verifyRefresh(token);
      expect(payload.sub).toBe("user123");
      // Token should be deleted (rotated)
      expect(getRedis().del).toHaveBeenCalled();
    });

    it("verifyRefresh throws on a token not in Redis", async () => {
      const { token } = await svc.signRefresh("user123");
      // Clear store to simulate revoked/missing token
      (getRedis() as ReturnType<typeof getRedis> & { _store: Map<string,string> })._store.clear();
      await expect(svc.verifyRefresh(token)).rejects.toThrow();
    });
  });

  // ── revokeAllRefresh ────────────────────────────────────────────────────────

  describe("revokeAllRefresh", () => {
    it("deletes all stored tokens for a user", async () => {
      await svc.signRefresh("user99");
      await svc.signRefresh("user99");
      await svc.revokeAllRefresh("user99");
      // pipeline.exec should have been called
      expect(getRedis().pipeline).toHaveBeenCalled();
    });
  });

  // ── issueTokenPair ──────────────────────────────────────────────────────────

  describe("issueTokenPair", () => {
    it("returns both access and refresh tokens with expiry dates", async () => {
      const fakeUser = { _id: { toString: () => "abc" }, email: "t@t.com", role: "user" as const };
      const pair     = await svc.issueTokenPair(fakeUser);
      expect(pair.accessToken).toBeTruthy();
      expect(pair.refreshToken).toBeTruthy();
      expect(pair.accessExpiresAt).toBeInstanceOf(Date);
      expect(pair.refreshExpiresAt).toBeInstanceOf(Date);
      expect(pair.refreshExpiresAt > pair.accessExpiresAt).toBe(true);
    });
  });
});
