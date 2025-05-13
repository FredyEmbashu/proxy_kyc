const Document = require('../models/Document');

// @desc    Upload a document
// @route   POST /api/documents/upload
// @access  Private
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { type, verificationId } = req.body;

    // Create document record
    const document = await Document.create({
      user: req.user._id,
      verification: verificationId || null,
      type,
      fileUrl: req.file.path, // This will be the path where multer saved the file
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get document by ID
// @route   GET /api/documents/:id
// @access  Private
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Check if user is authorized to view this document
    if (document.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this document'
      });
    }

    res.json({
      success: true,
      document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all documents for a user
// @route   GET /api/documents/user
// @access  Private
const getUserDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id });

    res.json({
      success: true,
      documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private/Admin
const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({})
      .populate('user', 'firstName lastName email')
      .populate('verification');

    res.json({
      success: true,
      documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add this function to the existing documentController.js file
const verifyDocumentAuthenticity = async (req, res) => {
  try {
    const { documentImage, documentType } = req.body;
    
    if (!documentImage || !documentType) {
      return res.status(400).json({
        success: false,
        message: 'Document image and type are required'
      });
    }
    
    // In a real implementation, we would:
    // 1. Save the base64 image to a temporary file
    // 2. Call a document verification model (could use libraries like Tesseract for OCR)
    // 3. Check for security features based on document type
    // 4. Return results
    
    // For demo purposes, we'll simulate a response
    // In production, replace this with actual document verification
    const isAuthentic = Math.random() > 0.2; // 80% chance of authentic for demo
    const confidence = isAuthentic ? 
      75 + Math.random() * 25 : // 75-100% if authentic
      40 + Math.random() * 35;  // 40-75% if potentially fraudulent
    
    // Possible issues that might be detected
    const possibleIssues = [
      'Inconsistent font patterns',
      'Missing security features',
      'Unusual document coloration',
      'Irregular document dimensions',
      'Suspicious watermark patterns',
      'Inconsistent text alignment',
      'Unusual microprint patterns'
    ];
    
    // Select random issues if not authentic
    const detectedIssues = isAuthentic ? [] : 
      possibleIssues
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 1);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    res.json({
      success: true,
      isAuthentic,
      confidence,
      detectedIssues,
      // Additional data that a real system might return
      documentDetected: true,
      documentType: documentType,
      securityFeaturesChecked: ['hologram', 'microprint', 'uv_response', 'font_consistency']
    });
    
  } catch (error) {
    console.error('Error in document verification:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during document verification',
      error: error.message
    });
  }
};

// Make sure to export this function along with the others
module.exports = {
  uploadDocument,
  getDocumentById,
  getUserDocuments,
  getAllDocuments,
  verifyDocumentAuthenticity
};