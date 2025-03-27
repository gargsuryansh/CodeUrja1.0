import mongoose from 'mongoose';

const LandSchema = new mongoose.Schema({
  surveyNumber: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  khasraNumber: {
    type: String,
    trim: true
  },
  area: {
    type: Number,
    required: true
  },
  areaUnit: {
    type: String,
    enum: ['sqft', 'sqm', 'acre', 'hectare'],
    default: 'sqm'
  },
  location: {
    address: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String
    }
  },
  geoLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  boundaries: {
    // GeoJSON for polygon representing the land boundaries
    type: {
      type: String,
      enum: ['Polygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: [[[Number]]], // Array of arrays of coordinates
      default: []
    }
  },
  owners: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ownerName: {
      type: String,
      required: true
    },
    ownershipPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    ownershipStartDate: {
      type: Date,
      default: Date.now
    }
  }],
  previousOwners: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    ownerName: String,
    ownershipPercentage: Number,
    ownershipStartDate: Date,
    ownershipEndDate: Date
  }],
  documents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  }],
  value: {
    amount: {
      type: Number
    },
    currency: {
      type: String,
      default: 'INR'
    },
    assessmentDate: {
      type: Date
    }
  },
  status: {
    type: String,
    enum: ['active', 'under_dispute', 'mutation_in_progress', 'locked'],
    default: 'active'
  },
  landType: {
    type: String,
    enum: ['agricultural', 'residential', 'commercial', 'industrial', 'mixed'],
    required: true
  },
  verificationStatus: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationDate: Date
  },
  encumbrances: [{
    type: {
      type: String,
      enum: ['mortgage', 'lien', 'lease', 'easement', 'other']
    },
    description: String,
    startDate: Date,
    endDate: Date,
    holderName: String,
    holderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    documentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    }
  }],
  transactionHistory: [{
    transactionType: {
      type: String,
      enum: ['registration', 'mutation', 'mortgage', 'release']
    },
    date: {
      type: Date,
      default: Date.now
    },
    description: String,
    parties: [{
      party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      role: {
        type: String,
        enum: ['seller', 'buyer', 'bank', 'witness', 'notary']
      }
    }],
    documentRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create geospatial index for efficient location queries
LandSchema.index({ geoLocation: '2dsphere' });

// Update the 'updatedAt' field on save
LandSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Land || mongoose.model('Land', LandSchema);