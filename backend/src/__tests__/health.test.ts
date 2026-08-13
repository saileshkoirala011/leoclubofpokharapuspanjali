import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";

/**
 * Health-check smoke tests.
 * The app module is imported WITHOUT starting the HTTP server
 * (start() is only called when app.ts is run directly).
 * Supertest creates its own ephemeral server for each test.
 */

afterAll(async () => {
  // Give any pending async operations a moment to settle
  await new Promise(r => setTimeout(r, 100));
});

describe("GET /", () => {
  it("returns 200 with success flag", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/Leo Club/i);
  });
});

describe("GET /health", () => {
  it("returns a health object with required fields", async () => {
    const res = await request(app).get("/health");
    // 200 = healthy, 503 = degraded (db not yet connected in CI) — both valid
    expect([200, 503]).toContain(res.status);
    expect(res.body).toHaveProperty("db");
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("ts");
  });
});

describe("GET /api", () => {
  it("returns the API root message", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/Leo Club/i);
  });
});

describe("404 handler", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await request(app).get("/this-route-does-not-exist-xyz");
    expect(res.status).toBe(404);
  });
});
