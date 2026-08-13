import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

/**
 * Health-check smoke tests.
 * These run in CI against a real Express app instance — no external
 * dependencies required beyond the test env-vars already set in ci.yml.
 */
describe("GET /", () => {
  it("returns 200 with success flag", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toMatch(/Leo Club/i);
  });
});

describe("GET /health", () => {
  it("returns a health object", async () => {
    const res = await request(app).get("/health");
    // May be 200 (healthy) or 503 (db not ready in CI) — both are valid responses
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
  });
});

describe("404 handler", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await request(app).get("/this-route-does-not-exist");
    expect(res.status).toBe(404);
  });
});
