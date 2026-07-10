import type { Response } from "express";

interface SuccessBody<T> {
  success: true;
  message: string;
  data:    T;
}

interface ErrorBody {
  success: false;
  message: string;
  details: unknown[] | null;
}

export function sendSuccess<T>(
  res:     Response,
  data:    T,
  message  = "Success",
  status   = 200,
): Response<SuccessBody<T>> {
  return res.status(status).json({ success: true, message, data });
}

export function sendError(
  res:     Response,
  message: string,
  status   = 500,
  details: unknown[] | null = null,
): Response<ErrorBody> {
  return res.status(status).json({ success: false, message, details });
}
