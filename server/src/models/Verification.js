const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'rejected'],
    default: 'pending'
  },
  documentType: {
    type: String,
    enum: ['id_card', 'passport', 'drivers_license'],
    required: true
  },
  documentNumber: {
    type: String,
    required: true
  },
  documentExpiry: {
    type: Date
  },
  documentFront: {
    type: String, // URL to the document front image
    required: true
  },
  documentBack: {
    type: String, // URL to the document back image (if applicable)
  },
  selfieImage: {
    type: String, // URL to the selfie image
  },
  faceMatchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  riskLevel: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  verificationDate: {
    type: Date,
    default: Date.now
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;