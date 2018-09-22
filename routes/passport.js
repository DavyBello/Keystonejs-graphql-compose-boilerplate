const keystone = require('keystone');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');

const User = keystone.list('User').model;

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
((email, password, done) => User.findOne({ email })
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
)));

// JWT STRATEGY
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
},
// done(err, user, info);
((jwtPayload, done) => done(null, jwtPayload || undefined)
)));

