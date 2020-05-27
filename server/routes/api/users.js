// users.js
// ***********************************************************************
// *****  Server side -- server/routes/api/users.js                  *****
// *****  The route for create new users                             *****
// *****  NOTE to self: These are recognized as user routes because  *****
// *****       of the path -- server/routes/api/users.js             *****
// ***********************************************************************

// node modules
const express = require('express');
const { check, validationResult } = require('express-validator');   //  See: https://express-validator.github.io/docs/
const chalk = require('chalk');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    // see https://jwt.io/#debugger for docs

const router = express.Router();

// local modules
const User = require('../../models/User');
const keys = require('../../../client/src/config/keys');

// ****************************************************
// *****  route: GET to /api/users                *****
// *****  desc: really just a test route          *****
// *****  access: Public                          *****
// *****  matches to: NOTHING on the client side  *****
// ****************************************************
router.get('/', (req, res) => res.send('User route'));    // use with POSTMAN for valdating route

// ***********************************************************************
// *****  route: POST to /api/users                                  *****
// *****  desc: Register (create) a user                             *****
// *****  access: Public                                             *****
// *****  matches to: client/src/actions/auth, register()            *****
// *****       & client/src/reducers/auth.js, case REGISTER_SUCCESS  *****
// ***********************************************************************
const checks = [
  check('username', 'Username is required').not().isEmpty(),
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
    const { username, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ username });

      // this is an error -- the user should not be there
      if (user) {
        // NOTE: to self -- we are formatting the error as an array of errors to be consistent on the client side
        return res.status(400).json({ errors: [{ msg: 'Username already in use!' }] });
      }

      // No user -- we are good to go
      user = new User({
        username,
        password
      });
  
      // Ecrypt password
      const rounds = 10;    // 10 is recommended by docs
      const salt = await bcrypt.genSalt(rounds);
      user.password = await bcrypt.hash(password, salt);
      user.provider = 'local';
      user.providerProfileId = '';
      await user.save();

      // Return jsonwebtoken
      const payload = { user: { id: user.id } };
        
      jwt.sign(
        payload,
        keys.jwtSecret,
        { expiresIn: 604800 },    //  7 days
        (err, token) => {
          // if the process errors out -- throw the error
          if (err) throw err;
          // no error -- send the token to the client side in the response (res.json({ token }))
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(chalk.red(err.message));
      res.status(500).send('Server error - serving user');
    }
  }
);

module.exports = router;
