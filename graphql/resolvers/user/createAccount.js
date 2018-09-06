const keystone = require('keystone');
// const { UserInputError } = require('apollo-server');

const User = keystone.list('User').model;

module.exports = {
  kind: 'mutation',
  name: 'createAccount',
  description: 'create a newUser account',
  args: {
    input: `input CreateUserAccountInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String!
		}`,
  },
  type: `type CreateUserAccountPayload {
    token: String!
    name: String!
  }`,
  resolve: async ({ args }) => {
    const {
      input: {
        firstName, lastName, email, password, username,
      },
    } = args;
    try {
      const existing = await User.findOne({ $OR: [username, email] });
      if (!existing) {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          username,
        });
        await newUser.save();
        return {
          name: newUser.name,
          token: newUser.signToken(),
        };
      }
      return Promise.reject(Error('username/email already exists'));
      // throw new UserInputError('username already exists');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
