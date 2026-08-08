const app = require('./app');
const connectDB = require('./config/dbConnection');
require("dotenv").config();

// Connect to MongoDB
connectDB();

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port ' + (process.env.PORT || 5000));
});
