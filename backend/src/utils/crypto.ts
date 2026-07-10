import crypto from "crypto";

/**
 * Generate a cryptographically secure random token.
 * @param bytes - Number of random bytes (default 32 → 64-char hex string)
 */
export function generateSecureToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * SHA-256 hash a plain token for safe storage in the DB.
 * Never store the raw token — only its hash.
 */
export function hashToken(plain: string): string {
  return crypto.createHash("sha256").update(plain).digest("hex");
}

/**
 * Constant-time comparison to prevent timing attacks.
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Generate a short numeric OTP (default 6 digits).
 */
export function generateOTP(digits = 6): string {
  const max = Math.pow(10, digits);
  const otp = crypto.randomInt(0, max);
  return otp.toString().padStart(digits, "0");
}
