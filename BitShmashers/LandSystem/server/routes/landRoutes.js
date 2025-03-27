const express = require('express');
const { body } = require('express-validator');
const { registerLand, getLands, getLandById } = require('../controllers/landController');
const upload = require('../middleware/fileUpload');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware
const landValidation = [
  body('landTitle')
    .trim()
    .notEmpty()
    .withMessage('Land title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Land title must be between 3 and 100 characters'),
  
  body('landType')
    .trim()
    .notEmpty()
    .withMessage('Land type is required')
    .isIn(['Agricultural', 'Residential', 'Commercial', 'Industrial', 'Mixed Use'])
    .withMessage('Invalid land type'),
  
  body('area')
    .isNumeric()
    .withMessage('Area must be a number')
    .isFloat({ min: 0 })
    .withMessage('Area must be greater than 0'),
  
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required'),
  
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be greater than 0'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
];

// Routes
router.post(
  '/register',
  protect,
  upload.single('documents'),
  landValidation,
  registerLand
);

router.get('/', protect, getLands);
router.get('/:id', protect, getLandById);

module.exports = router; 