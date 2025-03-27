const rateLimit = require('express-rate-limit');
const AppError = require('../utils/appError');

// General API rate limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiter for admin routes
exports.adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Stricter limit for admin routes
  message: {
    status: 'error',
    message: 'Too many admin requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError('Too many admin requests from this IP, please try again later.', 429));
  }
}); 