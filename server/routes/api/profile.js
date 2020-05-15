// profiles.js
// **************************************************************************
// *****  Server side -- server/routes/api/profile.js                   *****
// *****  The route for all things pertaining to user profiles          *****
// *****  NOTE to self: These are recognized as profile routes because  *****
// *****       of the path -- server/routes/api/profile.js              *****
// **************************************************************************

var express = require('express');
var router = express.Router();

// ****************************************************
// *****  route: GET to /api/profile              *****
// *****  desc: really just a test route          *****
// *****  access: Public                          *****
// *****  matches to: NOTHING on the client side  *****
// ****************************************************
router.get('/', (req, res) => res.send('Profile route'));    // use with POSTMAN

module.exports = router;