const mongose = require('mongoose');

const connectDB = async () => {
  try {
    await mongose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected to Echo database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};



module.exports = connectDB;