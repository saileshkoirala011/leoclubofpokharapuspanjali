import type { Request, Response, NextFunction } from "express";
import { ApiError }  from "../utils/ApiError.js";
import { logger }    from "../utils/logger.js";
import { env }       from "../config/env.js";

/**
 * Global error handler — must be registered last.
 * Maps known ApiError instances to structured JSON responses.
 * Unexpected (non-operational) errors are sanitised in production.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  err:  unknown,
  req:  Request,
  res:  Response,
  _next: NextFunction,
): void {
  if (err instanceof ApiError) {
    logger.warn({ err, requestId: req.requestId }, err.message);
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.details,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
    return;
  }

  // Unknown error — log full details, hide internals from client in prod
  logger.error({ err, requestId: req.requestId }, "Unhandled error");

  const message =
    env.NODE_ENV === "production" ? "Internal server error" : String(err);

  res.status(500).json({
    success: false,
    message,
    details: null,
    ...(env.NODE_ENV === "development" && {
      stack: err instanceof Error ? err.stack : undefined,
    }),
  });
}
