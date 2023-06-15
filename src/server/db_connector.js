// Mongoose singleton connecto
const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/chatt';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`${process.env.APP_NAME.toUpperCase()} Connected to MongoDB!`);
  } catch (error) {
    console.error(`${process.env.APP_NAME.toUpperCase()} cannot connect to MongoDB:`, error.message);
  }
};

// Export the connection function
module.exports = {
  connectToDatabase,
};
