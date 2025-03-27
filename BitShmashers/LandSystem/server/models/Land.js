const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  landTitle: {
    type: String,
    required: [true, 'Land title is required'],
    trim: true
  },
  landType: {
    type: String,
    required: [true, 'Land type is required'],
    enum: ['residential', 'commercial', 'agricultural', 'industrial'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: [0, 'Area cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    trim: true
  },
  documents: [{
    type: String,
    required: [true, 'At least one document is required']
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  // New fields for claim verification
  claimType: {
    type: String,
    enum: ['ownership', 'transfer', 'update'],
    required: true
  },
  existingRecordId: {
    type: String,
    required: [true, 'Existing record ID is required'],
    trim: true
  },
  verificationNotes: {
    type: String,
    trim: true
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: {
    type: Date
  },
  rejectionReason: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Update the updatedAt timestamp before saving
landSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Land = mongoose.model('Land', landSchema);

module.exports = Land; 