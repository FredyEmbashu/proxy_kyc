const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if we should skip MongoDB connection
  if (process.env.SKIP_MONGODB === 'true') {
    console.log('MongoDB connection skipped as per configuration');
    return;
  }
  
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    // Try alternative connection string format if DNS resolution fails
    try {
      const altConnectionString = process.env.MONGODB_URI.replace(
        'mongodb+srv://',
        'mongodb://'
      );
      console.log('Attempting alternative connection...');
      
      const conn = await mongoose.connect(altConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log(`MongoDB Connected (alternative): ${conn.connection.host}`);
    } catch (altError) {
      console.error(`All MongoDB connection attempts failed: ${altError.message}`);
      console.log('Continuing without database connection...');
      // Don't exit the process, allow the server to run without DB
    }
  }
};

module.exports = connectDB;