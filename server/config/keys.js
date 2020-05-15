// keys.js
//***************************************************************************************
//*****  Server side -- src/config/keys.js                                          *****
//*****  A block of decision code to determine what file to get interface key from  *****
//*****  NOTE: see file comments in config/passport.js                              *****
//***************************************************************************************

if ( process.env.NODE_ENV === 'production' ) {
  //  in production - send production keys
  module.exports = require('./prod')
} else {
  //  in development - send development keys
  module.exports = require('./dev')
}