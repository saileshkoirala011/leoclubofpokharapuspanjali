export const sendSuccess = (res, payload = null, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: payload,
  });
};

export const sendError = (res, message = "Error", statusCode = 500, details = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: details,
  });
};