// index.js
// *******************************************
// *****  server side - server/index.js  *****
// *****  This is the Express server     *****
// *******************************************

// node modules
const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

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

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/favorites', require('./routes/api/favorites'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(chalk.green(`Server started on port ${PORT}`)));
  
// catch 404 and forward to error handler -- gets here if it falls through everyting above
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.send({ error: err });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Serve the static asset
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};