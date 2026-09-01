/* eslint-disable @typescript-eslint/no-explicit-any */
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import { logger } from "../utils/logger.js";

/**
 * pino-http ships CJS + ESM bundles; depending on the version / bundler
 * the callable factory may live at .default. This guard handles both.
 */
const factory: (...args: any[]) => any =
  typeof (pinoHttp as any).default === "function"
    ? (pinoHttp as any).default
    : pinoHttp;

/**
 * HTTP request / response logger middleware.
 * Attaches a unique requestId to every request for tracing.
 * On authenticated routes, also attaches userId for easier log correlation.
 */
export const requestLogger = factory({
  logger,
  genReqId: () => randomUUID(),
  customProps: (req: any) => ({
    requestId: req.id,
    // req.user is populated by authenticate middleware — may be undefined on public routes
    userId: req.user?._id?.toString() ?? undefined,
  }),
  customLogLevel: (_req: any, res: any) => {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    req: (req: any) => ({
      method: req.method,
      url:    req.url,
      id:     req.id,
    }),
    res: (res: any) => ({ statusCode: res.statusCode }),
  },
});
