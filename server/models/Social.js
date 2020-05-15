// Social.js
//**************************************************************
//*****  Server side -- server/models/Social.js            *****
//*****  This is the data model for the Social collection  *****
//*****  Storage for users logging in with Social media    *****
//**************************************************************

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const SocialSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['facebook', 'twitter'],
    required: true
  },
  providerProfileId: {
    type: String,
    required: true
  },
  socialLinks: {
    fbAccess: String,      // Facebook accessToken
    fbRefresh: String,     // Facebook refreshToken
    twAccess: String,      // Twitter accessToken
    twSecret: String       // Twitter accessSecret
  },
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const Social = mongoose.model('social', SocialSchema);

module.exports = Social;
