/**
 * Standardized JSON response helpers to reduce boilerplate in controllers.
 */

export const sendSuccess = (res, data = {}, statusCode = 200) => {
  res.status(statusCode).json({ success: true, ...data });
};

export const sendCreated = (res, data = {}) => {
  sendSuccess(res, data, 201);
};

export const sendNotFound = (res, resource = "Resource") => {
  res.status(404).json({ success: false, message: `${resource} not found` });
};
