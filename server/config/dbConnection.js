const moongose = require('mongoose');

const connectDB = async() => {
  try {
    const conn = await moongose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {   
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;