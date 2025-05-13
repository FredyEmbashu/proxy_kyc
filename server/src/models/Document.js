const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Verification'
  },
  type: {
    type: String,
    enum: ['id_card', 'passport', 'drivers_license', 'utility_bill', 'bank_statement', 'selfie'],
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileName: {
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
  uploadDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  metadata: {
    type: Object
  }
}, {
  timestamps: true
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;