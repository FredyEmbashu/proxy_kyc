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

// User routes - no auth now
router.post('/', createVerification);
router.get('/user', getUserVerifications);
router.get('/:id', getVerificationById);

// Admin routes - no auth now
router.get('/', getAllVerifications);
router.put('/:id', updateVerification);
router.get('/stats/dashboard', getVerificationStats);

module.exports = router;
