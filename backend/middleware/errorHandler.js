export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? {
      name: err.name,
      message: err.message,
      stack: err.stack,
    } : {},
  });
};

export default errorHandler;
