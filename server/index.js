// index.js
// ****************************************************************************
// *****  server side - server/index.js                                   *****
// *****  This is the Express server. The start point of the server side  *****
// ****************************************************************************

// node modules
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

require ('dotenv').config();

const app = express();

// local modules
const connectDB = require('./middleware/db');

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// test the server connection
app.get('/', (req, res) => res.send('API Running'));

// designate routing
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/forecast', require('./routes/api/forecast'));
app.use('/api/favorites', require('./routes/api/favorites'));

// Serve static assets in production - this block is executed in the order presented
// This results in a process flow that looks like this:
//    Look for all the routes specified above to resolve routing
//    If not resolved: Then try using the static file for route resolution
//    If still not resolved: As a last resort ('*'), return the html file
// This is done because the build process (which must be executed before deployment to production)
//    Builds static execution files that replace the whole create-react-app side of the project

if (process.env.NODE_ENV === 'production') {
  // Set static folder - do this first
  app.use(express.static('client/build'));
  // Serve the static asset - then do this
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(chalk.green(`Server started on port ${PORT}`)));
  
// catch 404 and forward to error handler -- gets here if it falls through everyting above
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.send({ error: err });
});