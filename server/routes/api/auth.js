// auth.js
// *************************************************************************
// *****  Server side -- server/routes/api/auth.js                     *****
// *****  These are the server-side authentication routes for the app  *****
// *****  NOTE to self: These are recognized as auth routes because    *****
// *****       of the path -- server/routes/api/auth.js                *****
// *************************************************************************

// node modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    // see https://jwt.io/#debugger for docs
const { check, validationResult } = require('express-validator');   //  See: https://express-validator.github.io/docs/

const router = express.Router();

// local modules
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const keys = require('../../config/keys');
   
// ******************************************************************
// *****  route: GET to /api/auth                               *****
// *****  desc: Return authenticated user                       *****
// *****  access: Private                                       *****
// *****  matches to: client/src/actions/auth, loaduser()       *****
// *****       & client/src/reducers/auth.js, case USER_LOADED  *****
// ******************************************************************
router.get('/', auth, async (req, res) => {
  try {
    user = await User.findById(req.user.id).select('-password');    //  NOTE: to self req.user.id is from auth (jwt.verify)
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error - authenticating user');
  }
});
// ********************************************************************
// *****  route: POST to /api/auth                                *****
// *****  desc: Authenticate user & get token                     *****
// *****  access: Public                                          *****
// *****  matches to: client/src/actions/auth, login()            *****
// *****       & client/src/reducers/auth.js, case LOGIN_SUCCESS  *****
// ********************************************************************
const checks = [
  check('username', 'Username is required').not().isEmpty(),
  check('password', 'Password is required').exists()
];
router.post('/', checks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    // deconstruct body for easier access to individual fields
    const { username, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ username });

      // this is an error -- the user should be there
      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //  Validate password
      //  NOTE: in bcrypt.compare, password is the entered password
      //                           user.password is the encrypted password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return jsonwebtoken
      const payload = { user: { id: user.id } };
        
      jwt.sign( payload, keys.jwtSecret,  { expiresIn: 604800 }, (err, token) => {
          // if the process errors out -- throw the error
          if (err) throw err;
          // no error -- send the token to the client side
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(chalk.red(err.message));
      res.status(500).send('Server error - serving user');
    }
  }
);

// *********************************************************************************
// ***** DELETE to /api/auth will logout the current user & clear the profile  *****
// ***** matches to: actions/auth/logout()                                     *****
// *****             & src/reducers/auth.js/LOGOUT                             *****
// *********************************************************************************
// router.delete(`/`, (req, res, next) => {
//   req.logout();
//   req.session.destroy();
//   res.json({ message: 'You have been logged out.' });
//   next();
// })

module.exports = router;
