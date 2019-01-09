const passport = require('passport');
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');

const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
  accessToken,
  refreshToken,
  profile,
});

let Strategy;

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
  const { Strategy: MockStrategy } = require('../../../../__tests__/mocks/passport/mock-strategy');
  Strategy = new MockStrategy('google-token', GoogleTokenStrategyCallback);
} else {
  // GOOGLE STRATEGY
  const passportConfig = {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
  };
  Strategy = new GoogleTokenStrategy(passportConfig, GoogleTokenStrategyCallback);
}

passport.use(Strategy);

// Promisified authenticate function
const authenticate = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('google-token', { session: false }, (err, data, info) => {
    if (err) reject(err);
    resolve({ data, info });
  })(req, res);
});

module.exports = { Strategy, authenticate };
