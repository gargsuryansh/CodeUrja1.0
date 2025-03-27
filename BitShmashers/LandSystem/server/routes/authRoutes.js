const express = require('express');
const { register, login, getMe, uploadDetails, getAllUsers, handleGoogleAuth, createAdmin, adminLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const passport = require("passport");
require("../config/passport");
const { verifyAdminKey } = require('../middleware/adminAuthMiddleware');
const { apiLimiter } = require('../middleware/rateLimitMiddleware');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Debug middleware for all auth routes
router.use((req, res, next) => {
  console.log('\n=== Auth Route Request ===');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('========================\n');
  next();
});

// Specific limiter for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: {
    status: 'error',
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  }
});

// Apply general rate limiting to all routes
router.use(apiLimiter);

// Public routes with specific rate limits
router.post('/register', register); // 3 registrations per hour
router.post('/login',  login);
router.post('/admin/login', loginLimiter, adminLogin);
router.post('/google-auth', handleGoogleAuth);

// Admin creation route (public but requires admin key)
router.post(['/create-admin', '/create-admin '], (req, res, next) => {
  console.log('\n=== Create Admin Route ===');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Admin Key:', req.headers['x-admin-key']);
  console.log('========================\n');
  next();
}, verifyAdminKey, createAdmin);

// Protected routes
router.get('/me', protect, getMe);
router.get('/users', protect, getAllUsers);
router.post('/upload-details', protect, uploadDetails);
router.put("/uploadDetails/:id", protect, upload.single("profileImage"), uploadDetails);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false
  }),
  handleGoogleAuth
);

// OAuth success/failure routes
router.get("/google/success", (req, res) => {
  res.json({ message: "Google authentication successful!", user: req.user });
});

router.get("/google/failure", (req, res) => {
  res.status(401).json({ message: "Google authentication failed" });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('\n=== Auth Route Error ===');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('========================\n');
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal server error in auth route'
  });
});

module.exports = router;
