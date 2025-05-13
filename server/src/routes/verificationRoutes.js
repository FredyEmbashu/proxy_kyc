const express = require('express');
const router = express.Router();
const { 
  createVerification,
  getVerificationById,
  updateVerification,
  getUserVerifications,
  getAllVerifications,
  getVerificationStats
} = require('../controllers/verificationController');
const { protect, admin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, createVerification);
router.get('/user', protect, getUserVerifications);
router.get('/:id', protect, getVerificationById);

// Admin routes
router.get('/', protect, admin, getAllVerifications);
router.put('/:id', protect, admin, updateVerification);
router.get('/stats/dashboard', protect, admin, getVerificationStats);

module.exports = router;