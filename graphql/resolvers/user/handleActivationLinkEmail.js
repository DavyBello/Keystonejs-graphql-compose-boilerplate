module.exports = {
  kind: 'mutation',
  name: 'handleActivationLinkEmail',
  description: 'Send account activation link to user email',
  type: `type SendActivationLinkPayload {
		status: String!
		email: String!
	}`,
  resolve: async ({ context: { viewer } }) => {
    if (viewer.handleActivationLinkEmail) {
      try {
        await viewer.handleActivationLinkEmail();
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
