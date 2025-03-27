import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  documentType: {
    type: String,
    enum: [
      'sale_deed', 
      'gift_deed', 
      'will', 
      'mutation_order',
      'partition_deed',
      'power_of_attorney',
      'lease_deed',
      'mortgage_deed',
      'revenue_record',
      'court_decree',
      'land_map',
      'other'
    ],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileHash: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  relatedLand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Land'
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
    verificationDate: Date,
    verificationMethod: {
      type: String,
      enum: ['digital_signature', 'manual_verification', 'hash_verification', 'none'],
      default: 'none'
    }
  },
  parties: [{
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    partyName: String,
    role: {
      type: String,
      enum: ['seller', 'buyer', 'mortgagor', 'mortgagee', 'lessor', 'lessee', 'witness', 'notary']
    }
  }],
  metadata: {
    issueDate: Date,
    expiryDate: Date,
    issuedBy: String,
    registrationOffice: String,
    registrationNumber: String
  },
  accessControl: {
    isPublic: {
      type: Boolean,
      default: false
    },
    authorizedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    authorizedRoles: [{
      type: String,
      enum: ['user', 'admin', 'bank', 'verifier']
    }]
  },
  transactionHistory: [{
    action: {
      type: String,
      enum: ['created', 'viewed', 'updated', 'verified', 'shared']
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    details: String
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

// Update the 'updatedAt' field on save
DocumentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);