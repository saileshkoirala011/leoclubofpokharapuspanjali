import type { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

type Target = "body" | "query" | "params";

/**
 * Zod validation middleware factory.
 * Validates req[target] against the provided schema and replaces it with
 * the parsed (coerced + stripped) output so controllers receive clean data.
 */
export function validate(schema: ZodSchema, target: Target = "body"): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const details = (result.error as ZodError).errors.map((e) => ({
        field:   e.path.join("."),
        message: e.message,
      }));
      return next(ApiError.badRequest("Validation failed", details));
    }

    // Cast through unknown to avoid the TS overlap error —
    // we knowingly overwrite the typed property with sanitised data.
    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
}
