module.exports = {
  kind: 'mutation',
  name: 'sendUserActivationLink',
  description: 'Send account activation link to user email',
  type: `type SendActivationLinkPayload {
		status: String!
		email: String!
	}`,
  resolve: async ({ context: { viewer } }) => {
    if (viewer.sendActivationLink) {
      try {
        await viewer.sendActivationLink();
        return ({
          status: 'success',
          email: viewer.email,
        });
      } catch (e) {
        return Promise.reject(e);
      }
    } else {
      return Promise.reject(Error('this user cannot run this mutation'));
    }
  },
};
