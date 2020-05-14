// index.js
// *******************************************
// *****  server side - server/index.js  *****
// *****  This is the Express server     *****
// *******************************************

// node modules
const express = require('express');
// const mongoose = require('mongoose');
// const flash = require('connect-flash');
// const session = require('express-session');
const chalk = require('chalk');
// const cors = require('cors');

const app = express();

// local modules
// const passport = require('./passport');
// const keys = require('../client/src/config/keys');
// const connectDB = require('./middleware/db');

// Middleware
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));  //  replaces bodyparser.urlencoded
// app.use(express.json());                          //  replaces bodyparser.json
// app.use(flash());                                 //  for flash messages ( appear/pause/disappear )
// app.use(function (req, res, next) {               //  Global variables (custom -- used with flash())
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// configure/load session
// NOTE: must be done prior to using it in routes
// app.use(session({
//   secret: keys.sessionSecret,
//   resave: false,
//   saveUninitialized: false,
//   // ***** I've seen passport sessions being used with and without cookies. I'm trying without.
//   // ***** If it works I'll drop this block of commented out code
//   // name: keys.sessionCookieName,   // don't use the default session cookie name
//   // cookie: {
//   //   httpOnly: true,
//   //   maxAge: 60 * 60 * 1000,       // 60 minute cookie duration
//   //   sameSite: 'None',
//   //   // domain: 'your.domain.com', // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
//   //   // secure: true,              // recommended you use this setting in production if your site is published using HTTPS
//   // }
// })
// );

// app.use(passport.initialize());  // fire off passport
// app.use(passport.session());   // calls the serialize/deserialize

// test the connection
app.get('/', (req, res) => res.send('API Running'));

// routes
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth')); 
// app.use('/api/profile', require('./routes/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(chalk.yellow(`Server started on port ${PORT}`)));
  
// catch 404 and forward to error handler -- gets here if it falls through everyting above
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send({ error: err });
// });

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));
//   // Serve the static asset
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// };