// auth.js
// *************************************************************************
// *****  Server side -- server/routes/api/auth.js                     *****
// *****  These are the server-side authentication routes for the app  *****
// *****  NOTE to self: These are recognized as auth routes because    *****
// *****       of the path -- server/routes/api/auth.js                *****
// *************************************************************************

// node modules
const express = require('express');
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

const router = express.Router();

// local modules
const auth = require('../../middleware/auth');
const db = require('../../models');
// const passport = require('../../passport');
// const keys = require('../../../client/src/config/keys');

// ********************************************************************************
// ***** get the current user info -- called on each inbound auth route below *****
// ********************************************************************************
// const getCurrentUser = async (req, res) => {
//   // Expose only non-sensitive properties
//   const { id, username } = req.user;
//   // Expose any Social Media memberships
//   const memberships = await db.Social.find({ userId: new mongoose.Types.ObjectId(id) });
//   res.json({
//     id, username,
//     memberships: memberships.map(m => m.provider)
//   });
//   getToken(id);
// };

// // Return jsonwebtoken -- see https://jwt.io/#debugger for format
// getToken = async (id) => {
//   const payload = {
//     user: {
//       id: id
//     }
//   };

//   // create a token with a four hour expiration
//   const token = await jwt.sign(payload, `${keys.jwtSecret}`, { expiresIn: '4h' }, (err, token) => {
//     if (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     } else {
//       console.log(token);
//       res.json({ token });
//     }
//   });
// };

// ****************************************************
// *****  route: GET to /api/auth                 *****
// *****  desc: return an authorized user         *****
// *****  access: Private                         *****
// *****  matches to: NOTHING on the client side  *****
// ****************************************************
router.get('/', auth, async (req, res) => {
  try {
    // get the user by Id (but without the password)
    const user = await (await db.User.findById(req.user.id)).isSelected('-password')
    // pass the user along
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - returning authorized user')
  }
});

// *****************************************************************
// ***** GET to /api/ will return current logged in user info  *****
// ***** matches to: actions/auth loadUser()                   *****
// *****             & src/reducers/auth.js/USER_LOADED        *****
// *****************************************************************
// router.get(`/`, auth, async (req, res) => {
//   try {
//     const user = await db.User.findById(req.user.id).select('-password'); // leave off password
   
//     if (!req.user) {
//       return res.status(401).json({
//         message: 'You are not currently logged in.'
//       });
//     }

//     getCurrentUser(req, res);
//     // send user to front end
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// *******************************************************************************
// ***** POST to /api/auth/local will login a user and return the user data  *****
// ***** matches to: actions/auth/loginLocal()                               *****
// *****             & src/reducers/auth.js/LOGIN_SUCCESS                    *****
// *******************************************************************************
// router.post('/auth/local', passport.authenticate('local'), (req, res, next) => {
// router.post(`/local`, passport.authenticate('local'), auth, (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       message: 'Invalid username or password.'
//     })
//   };

//   getToken();
//   next();
// });

// **********************************************************************************
// ***** POST to /api/auth/facebook will login a user and return the user data  *****
// ***** matches to: actions/auth/loginFacebook()                               *****
// *****             & src/reducers/auth.js/LOGIN_SUCCESS                       *****
// **********************************************************************************
// router.post('/auth/facebook', passport.authenticate('facebook'), (req, res, next) => {
// router.post(`/facebook`, passport.authenticate('facebook'), auth, (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       message: 'Invalid username or password.'
//     })
//   };

//   getCurrentUser(req, res);
//   next();
// });

// *********************************************************************************
// ***** POST to /api/auth/twitter will login a user and return the user data  *****
// ***** matches to: actions/auth/loginTwitter()                               *****
// *****             & src/reducers/auth.js/LOGIN_SUCCESS                      *****
// *********************************************************************************
// router.post('/auth/twitter', passport.authenticate('twitter'), (req, res, next) => {
// router.post(`/twitter`, passport.authenticate('twitter'), auth, (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       message: 'Invalid username or password.'
//     })
//   };

//   getCurrentUser(req, res);
//   next();
// });

// *********************************************************************************
// ***** DELETE to /api/auth will logout the current user & clear the profile  *****
// ***** matches to: actions/auth/logout()                                     *****
// *****             & src/reducers/auth.js/LOGOUT                             *****
// *********************************************************************************
// router.delete('/auth', (req, res, next) => {
// router.delete(`/`, (req, res, next) => {
//   req.logout();
//   req.session.destroy();
//   res.json({
//     message: 'You have been logged out.'
//   });
//   next();
// })

module.exports = router;
