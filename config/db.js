const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB terhubung:', mongoose.connection.name);
  } catch (err) {
    console.error('Gagal terhubung ke MongoDB:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;