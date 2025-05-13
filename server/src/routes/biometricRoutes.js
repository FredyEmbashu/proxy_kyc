const express = require('express');
const router = express.Router();
const { compareFaces } = require('../controllers/biometricController');
const { protect } = require('../middleware/authMiddleware');

// Biometric routes
router.post('/face-match', protect, compareFaces);

module.exports = router;