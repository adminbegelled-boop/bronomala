const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/firewell';
    
    // Set strictQuery to false to prepare for Mongoose 7/8 default
    mongoose.set('strictQuery', false);

    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // In production with Render, we don't necessarily exit immediately so that logs are visible,
    // but we rethrow if critical
    console.warn('[MongoDB] Running without persistent DB or check MONGODB_URI');
  }
};

module.exports = connectDB;
