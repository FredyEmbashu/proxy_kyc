const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// Comment out the database connection
// const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Set flag to skip MongoDB
process.env.SKIP_MONGODB = 'false';

// Comment out the database connection
// connectDB();

// Import routes
const userRoutes = require('./routes/userRoutes');
const verificationRoutes = require('./routes/verificationRoutes');
const documentRoutes = require('./routes/documentRoutes');
const biometricRoutes = require('./routes/biometricRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mock data middleware - add this before routes
app.use((req, res, next) => {
  // Skip actual route handlers and use mock data
  if (process.env.SKIP_MONGODB === 'true' && req.method === 'GET') {
    const mockData = getMockDataForEndpoint(req.path);
    if (mockData) {
      return res.json({
        success: true,
        data: mockData
      });
    }
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/biometrics', biometricRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Namibia KYC System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Running in mock data mode - no database connection');
});

// Function to return mock data based on endpoint
function getMockDataForEndpoint(path) {
  // Mock data for different endpoints
  const mockData = {
    '/api/users': [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
    ],
    '/api/verifications': [
      { 
        id: 'VER-2023-001',
        userId: '1',
        status: 'completed',
        documentType: 'ID Card',
        createdAt: '2023-12-10T14:32:00',
        completedAt: '2023-12-10T14:45:00',
        faceMatchScore: 92,
        documentAuthScore: 95
      },
      { 
        id: 'VER-2023-002',
        userId: '2',
        status: 'pending',
        documentType: 'Passport',
        createdAt: '2023-12-09T11:15:00'
      }
    ],
    '/api/documents': [
      {
        id: 'DOC-2023-001',
        verificationId: 'VER-2023-001',
        type: 'ID Card',
        status: 'verified',
        uploadedAt: '2023-12-10T14:35:00'
      },
      {
        id: 'DOC-2023-002',
        verificationId: 'VER-2023-002',
        type: 'Passport',
        status: 'pending',
        uploadedAt: '2023-12-09T11:20:00'
      }
    ],
    '/api/biometrics': [
      {
        id: 'BIO-2023-001',
        verificationId: 'VER-2023-001',
        type: 'facial',
        status: 'verified',
        capturedAt: '2023-12-10T14:40:00'
      }
    ]
  };

  // Return mock data for the exact path or the base path
  if (mockData[path]) {
    return mockData[path];
  }
  
  // Check if it's a path with an ID parameter
  const basePath = '/' + path.split('/').slice(1, 3).join('/');
  if (mockData[basePath]) {
    const id = path.split('/').pop();
    return mockData[basePath].find(item => item.id === id) || null;
  }
  
  return null;
}