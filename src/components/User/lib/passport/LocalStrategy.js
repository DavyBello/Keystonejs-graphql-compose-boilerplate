const keystone = require('keystone');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

// User Model (This is a mongoose model)
const User = keystone.list('User').model;

const Strategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, ((email, password, done) => User.findOne({ email })
  .then((user) => {
    // done(err, user, info);
    if (!user) {
      return done(null, false, { code: 'NOTFOUND' });
    }

    return user._.password.compare(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (isMatch) {
        return done(null, user, { code: 'SUCCESSFULL' });
      }
      return done(null, false, { code: 'WRONGPASSWORD' });
    });
  })
  .catch(err => done(err))
));

passport.use(Strategy);

const authenticate = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) reject(err);
    resolve({ user, info });
  })(req, res);
});

module.exports = {
  Strategy,
  authenticate,
};
