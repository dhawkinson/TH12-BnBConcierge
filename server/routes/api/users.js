// users.js
// ***********************************************************************
// *****  Server side -- server/routes/api/users.js                  *****
// *****  The route for create new users                             *****
// *****  NOTE to self: These are recognized as user routes because  *****
// *****       of the path -- server/routes/api/users.js             *****
// ***********************************************************************

// node modules
const express = require('express');
const { check, validationResult } = require('express-validator');
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const gravatar = require('gravatar');
// const passport = require('passport');
// const mongoose = require('mongoose');

const router = express.Router();

// local modules
const db = require('../../models');
const keys = require('../../config/keys');

// ****************************************************************
// *****  get the current user info -- called on auth routes  *****
// ****************************************************************
// const getCurrentUser = async (req, res) => {
//   // Expose only non-sensitive properties
//   const { id, username } = req.user;
//   // Expose any Social Media memberships
//   const memberships = await db.Social.find({ userId: new mongoose.Types.ObjectId(id) });
//   res.json({
//     id, username,
//     memberships: memberships.map(m => m.provider)
//   });
// };

// ****************************************************
// *****  route: GET to /api/users                *****
// *****  desc: really just a test route          *****
// *****  access: Public                          *****
// *****  matches to: NOTHING on the client side  *****
// ****************************************************
router.get('/', (req, res) => res.send('User route'));    // use with POSTMAN

// ***********************************************************************
// *****  route: POST to /api/users                                  *****
// *****  desc: Register a user                                      *****
// *****  access: Public                                             *****
// *****  matches to: client/src/actions/auth, register()            *****
// *****       & client/src/reducers/auth.js, case REGISTER_SUCCESS  *****
// ***********************************************************************
//  See: https://express-validator.github.io/docs/
const checks = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 })
];
router.post('/',
  checks,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    };

    // deconstruct body for easier access to individual fields
    const { username, email, password } = req.body;

    try {
      // See if user exists
      let user = await db.User.findOne({ username });

      // this is an error -- the user should not be there
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Username already in use!' }] });
      }

      // No user -- we are good to go

      // if I decide to add gravatars, remove the comments above & here
      // will need to update User model to accomodate gravatars
      // waiting to see how that might work with Social credentials
      // const avatar = gravatar.url(email, {
      //   s: '200',
      //   r: 'pg',
      //   d: 'mm'
      // });

      user = new db.User({
        username,
        email,
        // avatar,
        password
      });
  
      // Ecrypt password
      const rounds = 10;    // 10 is recommended by docs
      const salt = await bcrypt.genSalt(rounds);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken -- see https://jwt.io/#debugger (payload is the center section of jwt)
      const payload = { user: { id: user.id } };
        
      jwt.sign(
        payload,
        keys.jwtSecret,
        { expiresIn: '4hr' },
        (err, token) => {
          // if the process errors out -- throw the error
          if (err) throw err;
          // no error -- send the token in the response (res.json())
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(chalk.red(err.message));
      res.status(500).send('Server error - finding user');
    }
  }
);

module.exports = router;
