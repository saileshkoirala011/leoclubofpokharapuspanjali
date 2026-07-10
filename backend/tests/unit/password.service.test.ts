import { describe, it, expect, vi } from "vitest";

// Mock env before importing service
vi.mock("../../src/config/env.js", () => ({
  env: { BCRYPT_ROUNDS: 4, NODE_ENV: "test" },
}));

import { PasswordService } from "../../src/services/password.service.js";

describe("PasswordService", () => {
  const svc = new PasswordService();

  // ── validate ────────────────────────────────────────────────────────────────

  describe("validate", () => {
    it("accepts a strong password", () => {
      expect(svc.validate("StrongP@ss1")).toBeNull();
    });

    it("rejects passwords shorter than 8 chars", () => {
      expect(svc.validate("Ab1!")).toContain("8 characters");
    });

    it("rejects passwords with no uppercase letter", () => {
      expect(svc.validate("weakpass1!")).toContain("uppercase");
    });

    it("rejects passwords with no number", () => {
      expect(svc.validate("Weakpass!")).toContain("number");
    });

    it("rejects passwords with no special character", () => {
      expect(svc.validate("Weakpass1")).toContain("special character");
    });

    it("rejects empty string", () => {
      expect(svc.validate("")).toBeTruthy();
    });
  });

  // ── hash / compare ──────────────────────────────────────────────────────────

  describe("hash + compare", () => {
    it("hashes a password and compares correctly", async () => {
      const plain  = "StrongP@ss1";
      const hashed = await svc.hash(plain);

      expect(hashed).not.toBe(plain);
      expect(hashed.startsWith("$2")).toBe(true); // bcrypt signature

      const match = await svc.compare(plain, hashed);
      expect(match).toBe(true);
    });

    it("returns false for wrong password", async () => {
      const hashed = await svc.hash("CorrectP@ss1");
      const match  = await svc.compare("WrongP@ss1", hashed);
      expect(match).toBe(false);
    });

    it("each hash is unique (different salts)", async () => {
      const h1 = await svc.hash("SameP@ss1");
      const h2 = await svc.hash("SameP@ss1");
      expect(h1).not.toBe(h2);
    });
  });
});
