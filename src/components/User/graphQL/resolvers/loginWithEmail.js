const { UserInputError } = require('apollo-server');
const { authenticate } = require('../../lib/passport/LocalStrategy');

module.exports = {
  kind: 'mutation',
  name: 'loginWithEmail',
  description: 'login a user',
  args: {
    input: `input LoginWithEmailInput {
			email: String!
	    password: String!
		}`,
  },
  type: `type LoginWithEmailPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args, context: { req, res } }) => {
    const { input: { email, password } } = args;
    req.body = {
      ...req.body,
      email,
      password,
    };
    try {
      const { user, info } = await authenticate(req, res);
      if (user) {
        return ({
          name: user.name,
          token: user.signToken(),
        });
      }

      if (info) {
        switch (info.code) {
          case 'NOTFOUND':
            return (new UserInputError('invalid credentials'));

          case 'WRONGPASSWORD':
            return (new UserInputError('invalid credentials'));

          default:
            return (new UserInputError('something went wrong'));
        }
      }

      return (new Error('server error'));
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
