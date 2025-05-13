const express = require('express');
const router = express.Router();
const { 
  uploadDocument,
  getDocumentById,
  getUserDocuments,
  getAllDocuments,
  verifyDocumentAuthenticity
} = require('../controllers/documentController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// User routes
router.post('/upload', protect, upload.single('document'), uploadDocument);
router.get('/user', protect, getUserDocuments);
router.get('/:id', protect, getDocumentById);
router.post('/verify-authenticity', protect, verifyDocumentAuthenticity);

// Admin routes
router.get('/', protect, admin, getAllDocuments);

module.exports = router;