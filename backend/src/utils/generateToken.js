import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

const REFRESH_EXPIRES = "7d";

const generateToken = {
  /** Short-lived access token */
  access: (payload) =>
    jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, algorithm: "HS256" }),

  /** Long-lived refresh token */
  refresh: (payload) =>
    jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES, algorithm: "HS256" }),

  /** Verify access token — throws on invalid/expired */
  verifyAccess: (token) =>
    jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }),

  /** Verify refresh token — throws on invalid/expired */
  verifyRefresh: (token) =>
    jwt.verify(token, JWT_REFRESH_SECRET, { algorithms: ["HS256"] }),
};

export default generateToken;
