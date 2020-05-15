// User.js
//************************************************************
//*****  Server side -- server/models/User.js            *****
//*****  This is the data model for the User collection  *****
//************************************************************

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  // NOTE: to self -- password is entered in Register.js for Local users
  // password is populated with accessToken for Social Media users
  password: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
