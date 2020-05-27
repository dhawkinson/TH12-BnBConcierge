// auth.js
// **************************************************************
// *****  Server side -- server/middleware/auth.js          *****
// *****  Authorize (or not) a user. Authorization rules:   *****
// *****   1. Must be a token from user registration/login  *****
// *****   2. If no token, validation denied                *****
// *****   3. If found, it must validate using jwt secret   *****
// **************************************************************

// node modules
const jwt = require('jsonwebtoken');

// local modules
const keys = require('../../client/src/config/keys');

module.exports = function (req, res, next) {
  // Get token from req header 'x-auth-token'
  const token = req.header('x-auth-token'); //header key

  // Reject if token not found
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;
  };

  // Verify token is valid if it is found
  try {
    // decode with the token and the jwt secret
    const decoded = jwt.verify(token, `${keys.jwtSecret}`);
    // success - req.user is passed to all protected routes as the authenticated user
    req.user = decoded.user;
    next();
  } catch (err) {
    // failure - send message that token is invalid
    res.status(401).json({ msg: 'Token is not valid' });
  }
};