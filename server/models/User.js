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
  // NOTE: to self -- password is entered in Register.js for Local users
  // may not be used at all for Social users -- waiting to see
  password: {
    type: String
  },
  // NOTE: to self -- provider and providerProfileId anticipate future addition
  //       of credentialing with Social Media (facebook & twitter)
  provider: {
    type: String,
    enum: ['local','facebook', 'twitter'],
    required: true
  },
  // NOTE: to self -- providerProfileId used only with social media login
  providerProfileId: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);

