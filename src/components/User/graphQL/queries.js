const { authAccess } = require('../../../graphQL/utils/authentication');

const { UserTC, ViewerTC } = require('./typeComposers');

module.exports = {
  ...authAccess({ scope: 'User' }, {
    userIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    viewer: ViewerTC.getResolver('viewer'),
  }),
};
