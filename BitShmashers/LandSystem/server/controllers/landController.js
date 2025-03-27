const Land = require('../models/Land');
const { validationResult } = require('express-validator');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Register new land
const registerLand = catchAsync(async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError(errors.array()[0].msg, 400));
    }

    // Check if user is authenticated
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const {
      landTitle,
      landType,
      area,
      location,
      description,
      price
    } = req.body;

    // Handle file upload
    let documentPath = null;
    if (req.file) {
      documentPath = req.file.path.replace(/\\/g, '/'); // Convert Windows path to Unix style
    }

    // Create new land entry
    const land = new Land({
      landTitle,
      landType,
      area: Number(area),
      location,
      description,
      price: Number(price),
      documents: documentPath,
      owner: req.user._id
    });

    // Save land
    await land.save();

    res.status(201).json({
      success: true,
      message: 'Land registered successfully',
      data: land
    });

  } catch (error) {
    console.error('Land registration error:', error);
    return next(new AppError(error.message || 'Error registering land', 500));
  }
});

// Get all lands for the authenticated user
const getLands = catchAsync(async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const { landType, status } = req.query;
    const query = { owner: req.user._id }; // Only fetch lands owned by the authenticated user

    // Apply additional filters if provided
    if (landType) query.landType = landType;
    if (status) query.status = status;

    const lands = await Land.find(query)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: lands.length,
      data: lands
    });

  } catch (error) {
    console.error('Get lands error:', error);
    return next(new AppError(error.message || 'Error fetching lands', 500));
  }
});

// Get single land by ID (only if owned by the authenticated user)
const getLandById = catchAsync(async (req, res, next) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    const land = await Land.findOne({
      _id: req.params.id,
      owner: req.user._id // Only allow access to lands owned by the authenticated user
    }).populate('owner', 'name email');

    if (!land) {
      return next(new AppError('Land not found or access denied', 404));
    }

    res.status(200).json({
      success: true,
      data: land
    });

  } catch (error) {
    console.error('Get land error:', error);
    return next(new AppError(error.message || 'Error fetching land', 500));
  }
});

module.exports = {
  registerLand,
  getLands,
  getLandById
}; 