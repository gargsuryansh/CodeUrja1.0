const AppError = require('../utils/appError');

// Simple IP whitelist check
exports.checkWhitelistedIP = (req, res, next) => {
  // Allow localhost and common development IPs
  const allowedIPs = ['127.0.0.1', '::1', 'localhost'];
  
  const clientIP = req.ip || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.headers['x-forwarded-for']?.split(',')[0];

  if (!allowedIPs.includes(clientIP)) {
    console.log(`Blocked admin access attempt from IP: ${clientIP}`);
    return next(new AppError('Access denied from this IP address', 403));
  }

  next();
}; 