const User = require('../models/userModel');
const bcryptjs = require('bcryptjs'); // Change to bcryptjs for consistency
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("../utils/cloudinary"); // Cloudinary utility
const mongoose = require('mongoose'); // Mongoose utility
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary'); // Assuming your cloudinary functions are in this file
const fs = require('fs');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { ADMIN_ACCESS_KEY } = require('../config/adminConfig');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Register user
exports.register = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email', 400));
  }

  // Create new user
  const user = await User.create({
    username,
    email,
    password
  });

  // Generate token
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    user
  });
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Don't allow admin login through regular login route
  if (user.role === 'admin') {
    return next(new AppError('Please use admin login', 401));
  }

  // Generate token
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    user
  });
});

// Admin login
exports.adminLogin = catchAsync(async (req, res, next) => {
  const { email, password, adminKey } = req.body;

  // Check if email, password and adminKey exist
  if (!email || !password || !adminKey) {
    return next(new AppError('Please provide email, password and admin key', 400));
  }

  // Verify admin key first
  if (adminKey !== process.env.ADMIN_ACCESS_KEY) {
    return next(new AppError('Invalid admin access key', 401));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Verify user is an admin
  if (user.role !== 'admin') {
    return next(new AppError('Access denied. Admin privileges required.', 403));
  }

  // Generate admin token with additional admin claim
  const token = jwt.sign(
    { id: user._id, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: 'success',
    token,
    user
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists with this email', 400));
  }

  // Create new admin user
  const user = await User.create({
    username,
    email,
    password,
    role: 'admin'
  });

  // Generate token
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    user
  });
});

exports.uploadDetails = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  let session;

  console.log("🔹 Received user data:", userData);
  console.log("🔹 Uploaded file:", req.file?.originalname ?? "No file uploaded");

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findById(id).session(session);
    if (!user) {
      throw new Error("User not found");
    }

    let imageUrl = user.profileImage || null;

    if (req.file) {
      try {
        // Delete old image if it exists and is a valid URL
        if (imageUrl && typeof imageUrl === 'string' && imageUrl.includes('cloudinary')) {
          const oldImageId = imageUrl.split("/").pop().split(".")[0];
          await deleteFromCloudinary(oldImageId);
        }

        // Upload new image
        const result = await uploadToCloudinary(req.file.path);
        if (!result?.url) {
          throw new Error("Cloudinary upload failed");
        }
        imageUrl = result.url;
        console.log("✅ New image uploaded:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Cloudinary upload error:", uploadError);
        throw new Error(`Image upload failed: ${uploadError.message}`);
      } finally {
        // Clean up uploaded file
        if (req.file.path && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...user.toObject(),
        ...userData,
        profileImage: imageUrl
      },
      { new: true, session }
    );

    await session.commitTransaction();
    res.status(200).json({ 
      message: "User updated successfully", 
      user: updatedUser 
    });

  } catch (error) {
    console.error("❌ Error:", error);
    await session?.abortTransaction();
    
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ 
        message: "Update failed", 
        error: error.message 
      });
    }

  } finally {
    await session?.endSession();
  }
};

exports.getMe = async (req, res) => {
  try {
    // Find the user by ID, which is available in req.userId from the middleware
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user); // Send the user data
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllUsers = async (req, res) => {
  try{
    const users = await User.find({})
    if(!users){
      return res.status(404).json({ message : "no users found"})
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.handleGoogleAuth = async (req, res) => {
  const { token, user } = req.user;

  // Redirect with token to frontend
  res.redirect(`${process.env.FRONTEND_URL}/auth/google/success?token=${token}`);
}