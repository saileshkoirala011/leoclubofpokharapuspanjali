const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.details || undefined,
  });
};

export default errorHandler;
