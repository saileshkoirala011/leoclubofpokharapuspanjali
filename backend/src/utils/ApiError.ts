export class ApiError extends Error {
  public readonly statusCode:    number;
  public readonly details:       unknown[] | null;
  public readonly isOperational: boolean;

  constructor(
    message:       string,
    statusCode     = 500,
    details:       unknown[] | null = null,
    isOperational  = true,
  ) {
    super(message);
    this.name          = "ApiError";
    this.statusCode    = statusCode;
    this.details       = details;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: string, details?: unknown[]): ApiError {
    return new ApiError(msg, 400, details ?? null);
  }
  static unauthorized(msg = "Unauthorized"): ApiError {
    return new ApiError(msg, 401);
  }
  static forbidden(msg = "Forbidden"): ApiError {
    return new ApiError(msg, 403);
  }
  static notFound(msg = "Not found"): ApiError {
    return new ApiError(msg, 404);
  }
  static conflict(msg: string): ApiError {
    return new ApiError(msg, 409);
  }
  static tooManyRequests(msg = "Too many requests"): ApiError {
    return new ApiError(msg, 429);
  }
  static internal(msg = "Internal server error"): ApiError {
    return new ApiError(msg, 500, null, false);
  }
}
