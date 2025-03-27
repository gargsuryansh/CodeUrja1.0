const express = require('express');
const router = express.Router();
const { protect, restrictToAdmin } = require('../middleware/authMiddleware');
const { verifyAdminKey } = require('../middleware/adminAuthMiddleware');
const { checkWhitelistedIP } = require('../middleware/ipWhitelistMiddleware');
const { adminLimiter } = require('../middleware/rateLimitMiddleware');
const {
  getPendingVerifications,
  getAllLands,
  verifyLand,
  getVerificationStats
} = require('../controllers/adminController');

// Apply security middleware to all admin routes
router.use(adminLimiter); // Rate limiting
router.use(checkWhitelistedIP); // IP whitelisting

// Admin routes with authentication
router.get('/pending-verifications', protect, restrictToAdmin, getPendingVerifications);
router.get('/all-lands', protect, restrictToAdmin, getAllLands);
router.patch('/verify-land/:landId', protect, restrictToAdmin, verifyLand);
router.get('/verification-stats', protect, restrictToAdmin, getVerificationStats);

// Error handling for admin routes
router.use((err, req, res, next) => {
  console.error(`Admin Route Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error in admin route'
  });
});

module.exports = router; 