// db.js
// ****************************************************
// *****  Server side -- server/middleware/db.js  *****
// *****  Create the connection to MongoDB        *****
// ****************************************************
// node modules
const mongoose = require('mongoose');       // require mongoose ODM library
const chalk    = require('chalk');          // used for coloring console.log output

// local modules
// const keys = require('../../client/src/config/keys') // require the config file pointer
const keys = require('../../client/src/config/keys'); // require the config file pointer
const URI  = keys.mongoURI                    // get the mongo connection string from keys file

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(chalk.green('MongoDB Connected...'));
  } catch(err) {
    console.error(chalk.red(err.message));
    // exit ptocess with fail
    process.exit(1);
  }
};

// export the resolved connection
module.exports = connectDB;