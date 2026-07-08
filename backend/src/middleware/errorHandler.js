import logger from "../utils/logger.js";

// Express error handler MUST have exactly 4 parameters
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const isProd     = process.env.NODE_ENV === "production";
  const isServer   = statusCode >= 500;

  if (isServer) {
    logger.error(`[${req.method}] ${req.path} — ${err.message}`, err.stack || "");
  } else {
    logger.warn(`[${req.method}] ${req.path} — ${statusCode} ${err.message}`);
  }

  const body = {
    success: false,
    message: isServer && isProd ? "Internal Server Error" : err.message,
  };

  if (err.details) body.errors = err.details;

  return res.status(statusCode).json(body);
};

export default errorHandler;
