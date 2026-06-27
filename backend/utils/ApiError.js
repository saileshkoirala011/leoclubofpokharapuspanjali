/**
 * Custom API error class for consistent error responses.
 * Provides a statusCode so the error handler can set the correct HTTP status.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

export default ApiError;
