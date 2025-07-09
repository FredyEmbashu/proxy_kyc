const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  getAllUsers 
} = require('../controllers/userController');

// Public routes (no change)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Open access routes - no authentication middleware
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

// Admin routes - now open to everyone (be careful)
router.get('/', getAllUsers);

module.exports = router;
