import rateLimit from "express-rate-limit";
import { ApiError } from "../utils/ApiError.js";

const handler = (_req: unknown, _res: unknown, next: (err: unknown) => void) =>
  next(ApiError.tooManyRequests("Too many requests — please slow down"));

/** General API limiter: 100 req / 15 min per IP */
export const apiLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             100,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
});

/** Strict limiter for auth endpoints: 10 req / 15 min per IP */
export const authLimiter = rateLimit({
  windowMs:        15 * 60 * 1000,
  max:             10,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
});

/** Password reset — very strict: 5 req / hour */
export const resetLimiter = rateLimit({
  windowMs:        60 * 60 * 1000,
  max:             5,
  standardHeaders: true,
  legacyHeaders:   false,
  handler,
});
