const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pravxnstudio');
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    // Non-fatal fallback for development without MongoDB active
    console.warn(`[MongoDB Warning] Running without persistent DB connection if Mongo is offline.`);
  }
};

module.exports = connectDB;
