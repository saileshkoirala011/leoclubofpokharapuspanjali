import type { AuthenticatedUser } from "./auth.types.js";

declare global {
  namespace Express {
    interface Request {
      /** Set by authenticate middleware after JWT verification */
      user?:      AuthenticatedUser;
      /** Unique request ID injected by requestLogger middleware */
      requestId?: string;
    }
  }
}
