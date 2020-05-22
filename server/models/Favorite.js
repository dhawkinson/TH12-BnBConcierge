// Favorite.js
// **************************************************************
// *****  Server side -- server/models/Favorite.js          *****
// *****  This is the data model for the Favorite document  *****
// *****  NOTE: The favorite is a convenience for the user  *****
// *****        It is a saved record of selections made     *****
// *****        while the user is a guest of the BnB. It    *****
// *****        is voluntarily saved if desired and will    *****
// *****        serve as a means of quickly recalling       *****
// *****        selections made on previous visits.         *****
// **************************************************************

const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  venues: [{
    variety: {
      type: String,
      required: true,
      enum: ['A', 'R']
    },
    genre: {
      type: String
    },
    category: {
      type: String,
      required: true
    },
    venueId: {
      type: String,
      required: true
    },
    venueName: {
      type: String,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipcode: {
      type: String,
      required: true
    },
    country: {
      type: String
    },
    apiUrl: {
      type: String,
      required: true
    },
    visited: {
      type: Boolean,
      default: false
    },
    liked: {
      type: Boolean,
      default: false
    },
    dateAdded: {
      type: Date,
      default: Date.now
    }
}],
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Favorite = mongoose.model('favorite', ProfileSchema);