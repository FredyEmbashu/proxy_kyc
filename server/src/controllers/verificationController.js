const Verification = require('../models/Verification');
const User = require('../models/User');

// @desc    Create a new verification request
// @route   POST /api/verifications
// @access  Private
const createVerification = async (req, res) => {
  try {
    const {
      documentType,
      documentNumber,
      documentExpiry,
      documentFront,
      documentBack,
      selfieImage
    } = req.body;

    const verification = await Verification.create({
      user: req.user._id,
      documentType,
      documentNumber,
      documentExpiry,
      documentFront,
      documentBack,
      selfieImage,
      status: 'pending'
    });

    // Update user verification status
    await User.findByIdAndUpdate(req.user._id, { verificationStatus: 'pending' });

    res.status(201).json({
      success: true,
      verification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get verification by ID
// @route   GET /api/verifications/:id
// @access  Private
const getVerificationById = async (req, res) => {
  try {
    const verification = await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification not found'
      });
    }

    // Check if user is authorized to view this verification
    if (verification.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this verification'
      });
    }

    res.json({
      success: true,
      verification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update verification status
// @route   PUT /api/verifications/:id
// @access  Private/Admin
const updateVerification = async (req, res) => {
  try {
    const { status, riskLevel, faceMatchScore, notes, rejectionReason } = req.body;

    const verification = await Verification.findById(req.params.id);

    if (!verification) {
      return res.status(404).json({
        success: false,
        message: 'Verification not found'
      });
    }

    // Update verification fields
    verification.status = status || verification.status;
    verification.riskLevel = riskLevel || verification.riskLevel;
    verification.faceMatchScore = faceMatchScore || verification.faceMatchScore;
    verification.notes = notes || verification.notes;
    
    if (status === 'rejected') {
      verification.rejectionReason = rejectionReason || 'Verification rejected';
    }
    
    if (status === 'completed' || status === 'rejected') {
      verification.verifiedBy = req.user._id;
      
      // Update user verification status
      const userStatus = status === 'completed' ? 'verified' : 'rejected';
      await User.findByIdAndUpdate(verification.user, { verificationStatus: userStatus });
    }

    const updatedVerification = await verification.save();

    res.json({
      success: true,
      verification: updatedVerification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all verifications for a user
// @route   GET /api/verifications/user
// @access  Private
const getUserVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find({ user: req.user._id });

    res.json({
      success: true,
      verifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get all verifications
// @route   GET /api/verifications
// @access  Private/Admin
const getAllVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find({})
      .populate('user', 'firstName lastName email phoneNumber')
      .populate('verifiedBy', 'firstName lastName');

    res.json({
      success: true,
      verifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get verification statistics for dashboard
// @route   GET /api/verifications/stats/dashboard
// @access  Private/Admin
const getVerificationStats = async (req, res) => {
  try {
    const totalVerifications = await Verification.countDocuments();
    const pendingVerifications = await Verification.countDocuments({ status: 'pending' });
    const completedVerifications = await Verification.countDocuments({ status: 'completed' });
    const rejectedVerifications = await Verification.countDocuments({ status: 'rejected' });

    // Get verifications by document type
    const idCardVerifications = await Verification.countDocuments({ documentType: 'id_card' });
    const passportVerifications = await Verification.countDocuments({ documentType: 'passport' });
    const driversLicenseVerifications = await Verification.countDocuments({ documentType: 'drivers_license' });

    // Get recent verifications
    const recentVerifications = await Verification.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'firstName lastName email');

    res.json({
      success: true,
      stats: {
        totalVerifications,
        pendingVerifications,
        completedVerifications,
        rejectedVerifications,
        documentTypes: {
          idCard: idCardVerifications,
          passport: passportVerifications,
          driversLicense: driversLicenseVerifications
        },
        recentVerifications
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createVerification,
  getVerificationById,
  updateVerification,
  getUserVerifications,
  getAllVerifications,
  getVerificationStats
};