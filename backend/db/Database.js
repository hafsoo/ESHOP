const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL);
    console.log(`✅ MongoDB connected with server: ${data.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Stop the app if DB fails
  }
};

module.exports = connectDatabase;
