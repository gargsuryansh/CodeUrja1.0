const Land = require('../models/Land');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Get pending claim verifications
exports.getPendingVerifications = catchAsync(async (req, res, next) => {
  const pendingClaims = await Land.find({ status: 'pending' })
    .populate('owner', 'username email')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: pendingClaims
  });
});

// Get all land claims
exports.getAllLands = catchAsync(async (req, res, next) => {
  const lands = await Land.find()
    .populate('owner', 'username email')
    .populate('verifiedBy', 'username')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    data: lands
  });
});

// Verify or reject a land claim
exports.verifyLand = catchAsync(async (req, res, next) => {
  const { landId } = req.params;
  const { status, verificationNotes, rejectionReason } = req.body;

  const land = await Land.findById(landId);
  if (!land) {
    return next(new AppError('Land claim not found', 404));
  }

  if (land.status !== 'pending') {
    return next(new AppError('This claim has already been processed', 400));
  }

  // Update land status and verification details
  land.status = status;
  land.verificationNotes = verificationNotes;
  land.verifiedBy = req.user._id;
  land.verifiedAt = Date.now();

  if (status === 'rejected') {
    if (!rejectionReason) {
      return next(new AppError('Rejection reason is required', 400));
    }
    land.rejectionReason = rejectionReason;
  }

  await land.save();

  res.status(200).json({
    status: 'success',
    data: land
  });
});

// Get verification statistics
exports.getVerificationStats = catchAsync(async (req, res, next) => {
  const stats = await Land.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: stats
  });
});

module.exports = {
  getPendingVerifications,
  verifyLand,
  getAllLands,
  getVerificationStats
}; 