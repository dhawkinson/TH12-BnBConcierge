// localStrategy.js
// *************************************************************************
// ***** Server-side -- server/middleware/passport/localStrategy.js    *****
// ***** Passport Local Strategy                                       *****
// ***** user authentication using locally entered username/password.  *****
// *************************************************************************

// node modules
const LocalStrategy = require('passport-local').Strategy;
const chalk = require('chalk');
const bcrypt = require('bcryptjs');

// local modules
const dUser = require('../../server/models/User');

const locOptions = { usernameField: 'username' };	// default, so really not necessary

strategy = (
	new LocalStrategy(locOptions,
		async (username, password) => {
			try {
				let user = await User.findOne({ username });
					if (!user) {
						return done(null, false, { message: 'Invalid user credentials' })
					}
					// Compare password
					const isMatch = await bcrypt.compare(password, user.password) //  password = entered password; user.password = ecrypted password from found user
					if (!isMatch) {
						return done(null, false, { message: 'Invalid user credentials' })
					}
					return done(null, user)
				} catch (err) {
				console.error(chalk.red(err.message));
				res.status(500).send('Server error - finding local user');
			}
  })
)

module.exports = strategy