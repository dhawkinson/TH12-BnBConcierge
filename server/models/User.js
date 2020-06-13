// User.js
//************************************************************
//*****  Server side -- server/models/User.js            *****
//*****  This is the data model for the User collection  *****
//************************************************************

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // NOTE: -- the next three fields by default are null
  //       they are temporarily set for password reset, then return to null
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetPasswordEmail: String,
  // NOTE: -- provider and providerProfileId anticipate future addition
  //       of credentialing with Social Media (facebook & twitter)
  provider: {
    type: String,
    enum: ['local','facebook', 'twitter'],
    required: true
  },
  // NOTE: -- providerProfileId used only with social media login
  providerProfileId: String,
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);

