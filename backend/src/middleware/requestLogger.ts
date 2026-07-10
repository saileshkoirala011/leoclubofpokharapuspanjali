import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import { logger } from "../utils/logger.js";

// pino-http types vary by version — use a loose cast to avoid TS2349
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const factory: (...args: any[]) => any = (pinoHttp as any).default ?? pinoHttp;

/**
 * HTTP request / response logger.
 * Attaches a unique requestId to every request for distributed tracing.
 */
export const requestLogger = factory({
  logger,
  genReqId: () => randomUUID(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customProps: (req: any) => ({ requestId: req.id }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customLogLevel: (_req: any, res: any) => {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
  serializers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: (req: any) => ({ method: req.method, url: req.url, id: req.id }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    res: (res: any) => ({ statusCode: res.statusCode }),
  },
});
