const AppError = require('../utils/appError');

// Simple admin key verification
exports.verifyAdminKey = (req, res, next) => {
  console.log('\n=== Admin Key Verification ===');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  const adminKey = req.headers['x-admin-key'] || req.body.adminKey;
  console.log('Admin Key Received:', adminKey);
  console.log('Expected Admin Key:', process.env.ADMIN_ACCESS_KEY);

  if (!adminKey) {
    console.log('Error: No admin key provided');
    return next(new AppError('Admin access key is required', 401));
  }

  if (adminKey !== process.env.ADMIN_ACCESS_KEY) {
    console.log('Error: Invalid admin key');
    return next(new AppError('Invalid admin access key', 401));
  }

  console.log('Admin key verification successful');
  console.log('========================\n');
  next();
}; 