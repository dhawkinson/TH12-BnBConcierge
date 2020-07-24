// auth.js
// *************************************************************************
// *****  Server side -- server/routes/api/auth.js                     *****
// *****  These are the server-side authentication routes for the app  *****
// *****  NOTE to self: These are recognized as auth routes because    *****
// *****       of the path -- server/routes/api/auth.js                *****
// *************************************************************************

// node modules
const express = require('express');
const Waterfall = require('async/waterfall');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');    // see https://jwt.io/#debugger for docs
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer'); //  see: https://www.npmjs.com/package/nodemailer
const { check, validationResult } = require('express-validator');   //  See: https://express-validator.github.io/docs/

const router = express.Router();

// local modules
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const sgMailKey = process.env.REACT_APP_SENDGRIP_API_KEY;
const pwResetSecret = process.env.REACT_APP_PW_RESET_SECRET;
const pwEmailAuthorizer = process.env.REACT_APP_PW_EMAIL_AUTHORIZER;
const pwEmailPassword = process.env.REACT_APP_PW_EMAIL_PASSWORD;
const jwtSecret = process.env.REACT_APP_JWT_SECRET;

// ********************************************************************************
// *****  The next three functions are used in the reset password chain       *****
// *****                                                                      *****
// *****    makeToken -- creates a random token to identify the user          *****
// *****    updateUserWithToken -- attaches the token to the user with expiry *****
// *****    setupAndSendEmail -- builds email with reset link and sends it    *****
// *****                                                                      *****
// *****    SendGrid is the email service used in this process                *****
// *****                                                                      *****
// *****    The completion of the chain above pauses the processing           *****
// *****    When the email is received, the process picks up again when the   *****
// *****    user clicks on the link within the email and is directed to:      *****
// *****        1.  validateToken route, where the token is matched, then     *****
// *****        2.  resetPassword route, where the password is reset          *****
// *****    With that the reset password cycle is completed                   *****
// ********************************************************************************

// build the password reset token
const makeToken = (done) => {
  let length = 20;
  let randomStr = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    randomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  randomStr += characters.charAt(Math.floor(Math.random() * charactersLength));
  const bufferText = Buffer.from(randomStr, 'utf8');
  const resetToken = bufferText.toString('hex');

  done(resetToken);
};

// update the user with the password reset token
const updateUserWithToken = (resetToken, email, done) => {
  console.log('UPDATE USER WITH TOKEN resetToken ', resetToken)
  User.findOne({ username: req.body.username }, (err, user) => {
    if (!user) {
      req.flash('error', 'Invalid username');
      return res.redirect('/requestReset');
    }

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    user.resetPasswordEmail = email;

    user.save((err) => {
      console.log('UPDATE USER WITH TOKEN err ', err)
      console.log('UPDATE USER WITH TOKEN user ', user)
      done(err, resetToken, user);
    });
  });
};

// format/build the email and send it
const setupAndSendEmail = (resetToken, user, done) => {
  // const transporter = nodemailer.createTransport('SMTP', {
  //   service: 'SendGrid',        //  email service, see: https://sendgrid.com/
  //   // authorization for email service
  //   auth: {
  //     user: `${pwEmailAuthorizer}`,
  //     pass: `${pwEmailPassword}`
  //   }
  // });
  // setup content of email
  const msg = {
    to: user.passwordResetEmail,
    from: 'info@hawkslandingbnb.com',
    subject: 'Hawks Landing BnB Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste it into your browser to complete the process:\n\n' +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
    'Please DO NOT reply to this email! It will not be answered. \n\n' +
    'http://' + req.headers.host + '/api/auth/validateToken/' + resetToken + '\n\n'
  };
  // send the email
  sgMail
  .send(msg)
  .then(() => {
    console.log(`Email sent to ${ user.passwordResetEmail }`)
  }, error => {
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  });
};
  
// ******************************************************************************** 
// ********************************************************************************

// *****  Routes

// ************************************************************************
// *****  route: GET to /api/auth                                     *****
// *****  desc: Return authenticated user                             *****
// *****  access: Private                                             *****
// *****  matches to: client/src/redux/actions/auth, loaduser()       *****
// *****       & client/src/redux/reducers/auth.js, case USER_LOADED  *****
// *****                                                              *****
// *****  NOTE: using jwt for auth token, rather than cookie          *****
// *****                                                              *****
// ************************************************************************
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
// *****  desc: Login user & get token                            *****
// *****  access: Public                                          *****
// *****  matches to: client/src/actions/auth, login()            *****
// *****       & client/src/reducers/auth.js, case LOGIN_SUCCESS  *****
// ********************************************************************
let checks = [
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
        
      jwt.sign( payload, jwtSecret,  { expiresIn: 604800 }, (err, token) => {
        // if the process errors out -- throw the error
        if (err) throw err;
        // no error -- send the token to the client side
        res.json({ token });
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error - serving user');
    }
  }
);
   
// ******************************************************************************
// *****  route: POST to /api/auth/requestReset                             *****
// *****  desc: Set passwordReset token & send email to user                *****
// *****  access: Private                                                   *****
// *****  matches to: client/src/actions/auth, requestReset()               *****
// *****       & client/src/reducers/auth.js, case RESET_REQUESTED_SUCCESS  *****
// ******************************************************************************
checks = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Invalid email format').isEmail()
];
router.post('/requestReset', checks, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  // deconstruct body for easier access to individual fields
  const { username, email } = req.body

  // ****************************************************************************************
  // *****  https://caolan.github.io/async/v3/index.html                                *****
  // *****  waterfall is an async method (see above - require('async/waterfall'))       *****
  // *****  now we 'Waterfall' down through the steps to produce and send the email     *****
  // *****                                                                              *****
  // *****  makeToken -- creates the token, identifies the user resetting the password  *****
  // *****  updateUserWithToken -- updates token and expiry to user instance            *****
  // *****  setupAndSendEmail -- creates the email with the reset link and sends it     *****
  // ****************************************************************************************
  Waterfall([
    makeToken,
    updateUserWithToken,
    setupAndSendEmail(email)
  ],
  (err) => {
      if (err) return next(err);
      res.redirect('/requestReset');
  });
});


// **************************************************************************
// *****  route: GET to /api/auth/validateToken/:token                  *****
// *****  desc: Receive Password Reset Token & redirect to reset        *****
// *****  access: Private                                               *****
// *****  matches to: client/src/actions/auth, validateToken()          *****
// *****       & client/src/reducers/auth.js, case RESET_TOKEN_SUCCESS  *****
// **************************************************************************
router.get('/validateToken/:token', async (req, res) => {

  // find a user with a resetPasswordToken that matches the request & has not expired
  const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    // Fail -- no user or token expired
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/requestReset');
    }
    console.log('VALIDATE TOKEN ROUTE user ', JSON.stringify(user))
    // Success -- reset password
    res.redirect('/resetPassword',{  user });
  });
});

// *****************************************************************************
// *****  route: PUT to /api/auth/resetPassword                            *****
// *****  desc: Reset user password                                        *****
// *****  access: Private                                                  *****
// *****  matches to: client/src/actions/auth, resetPassword()             *****
// *****       & client/src/reducers/auth.js, case PASSWORD_RESET_SUCCESS  *****
// *****************************************************************************
checks = [
  check('password', 'Password is required and must be at least 6 characters').isLength({ min: 6 }),
  check('password2', 'Confirming Password is required and must be at least 6 characters').isLength({ min: 6 })
];
router.put('/resetPassword', checks, async (req, res) => {
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
      if (!user) {
        // NOTE: to self -- we are formatting the error as an array of errors to be consistent on the client side
        return res.status(400).json({ errors: [{ msg: 'Username was not found!' }] });
      }
  
      // Ecrypt password
      const rounds = 10;    // 10 is recommended by docs
      const salt = await bcrypt.genSalt(rounds);
      user.password = await bcrypt.hash(password, salt);
      user.resetPasswordToken = null;
      user.resetTokenExpires = null;
      await user.save();

      // Return jsonwebtoken
      const payload = { user: { id: user.id } };
        
      jwt.sign(
        payload,
        keys.jwtSecret,
        { expiresIn: 604800000 },    //  7 days
        (err, token) => {
          // if the process errors out -- throw the error
          if (err) throw err;
          // no error -- send the token to the client side in the response (res.json({ token }))
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error - resetting user password');
    }
  }
);

// ***************************************************************
// ***** route: DELETE to /api/auth                          *****
// ***** desc: Logout the current user & clear the favorite  *****
// ***** matches to: actions/auth/logout()                   *****
// *****             & src/reducers/auth.js/LOGOUT           *****
// ***************************************************************
router.get(`/logout`, (req, res) => {
  req.logout();
  res.json({ message: 'You have been logged out.' });
  res.redirect('/');
})

module.exports = router;
