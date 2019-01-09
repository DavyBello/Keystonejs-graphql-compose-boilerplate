/* eslint-disable no-unused-vars */
// eslint-disable-next-line func-names
module.exports = async function ({ accessToken, refreshToken, profile }) {
  const User = this;

  try {
    const user = await User.findOne({ 'socail._gP.id': profile.id });

    // no user was found, lets create a new one
    if (!user) {
      const newUser = await User.create({
        name: profile.displayName || `${profile.familyName} ${profile.givenName}`,
        email: profile.emails[0].value,
        'social._gP': {
          id: profile.id,
          token: accessToken,
        },
      });

      return newUser;
    }
    return user;
  } catch (error) {
    return error;
  }
};
