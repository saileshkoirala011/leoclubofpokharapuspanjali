export const errorHandler = (err, req, res, _next) => {
<<<<<<< HEAD
  console.error('Error:', { message: err.message, name: err.name, stack: err.stack });

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue).join(', ');
    message = `Duplicate value for: ${field}`;
  }
=======
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;
>>>>>>> origin/devin/1782546719-security-fixes

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal Server Error' : err.message,
  });
};

export default errorHandler;
