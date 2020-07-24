// db.js
// ****************************************************
// *****  Server side -- server/middleware/db.js  *****
// *****  Create the connection to MongoDB        *****
// ****************************************************
// node modules
const mongoose = require('mongoose');       // require mongoose ODM library
const chalk = require('chalk');

// local modules
// const keys = require('../config/keys'); // require the config file pointer
const uri = process.env.MONGO_URI;         // get the mongo connection string

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(chalk.green('MongoDB Connected...'));
  } catch(err) {
    console.error(err.message);
    // exit ptocess with fail
    process.exit(1);
  }
};

// export the resolved connection
module.exports = connectDB;