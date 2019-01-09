const keystone = require('keystone');
const { UserInputError } = require('apollo-server');
const { authenticate } = require('../../lib/passport/GoogleTokenStrategy');

const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'loginWithGoogle',
  description: 'login a user',
  args: {
    input: `input LoginWithGoogleInput {
			accessToken: String!
		}`,
  },
  type: `type LoginWithGooglePayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args, context: { req, res } }) => {
    const { input: { accessToken: token } } = args;
    req.body = {
      ...req.body,
      access_token: token,
    };

    try {
      const { data, info } = await authenticate(req, res);
      const { accessToken, refreshToken, profile } = data;

      const user = await User.upsertGoogleUser({ accessToken, refreshToken, profile });

      if (user) {
        return ({
          name: user.name,
          token: user.signToken(),
        });
      }
      if (info) {
        switch (info.code) {
          case 'ETIMEDOUT':
            return (new UserInputError('Failed to reach Google: Try Again'));
          default:
            return (new UserInputError('something went wrong'));
        }
      }
      return (Error('server error'));
    } catch (error) {
      return error;
    }
  },
};
