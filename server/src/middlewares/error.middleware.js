import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
  logger.error(`${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    }
  });
};

export default errorHandler;
