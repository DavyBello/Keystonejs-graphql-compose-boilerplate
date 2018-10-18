// Get logic middleware
const {
  authAccess,
} = require('../logic/authentication');
const {
  updateSelf,
} = require('../logic/common');

const {
  UserTC,
  PlaceHolderTC,
} = require('../composers');

module.exports = {

  // unauthorized user mutations
  loginUser: UserTC.getResolver('loginWithEmail'),
  authGoogle: UserTC.getResolver('loginWithGoogle'),
  userCreateAccount: UserTC.getResolver('createAccount'),
  userActivateAccount: UserTC.getResolver('activateAccount'),
  userSendPasswordResetLink: UserTC.getResolver('handlePasswordResetLinkEmail'),
  userResetPassword: UserTC.getResolver('resetPassword'),

  // Authorized user mutations
  ...authAccess({ scope: 'User' }, {
    userResendActivationLink: UserTC.getResolver('handleActivationLinkEmail'),
    userChangePassword: UserTC.getResolver('changePassword'),
    userUpdateSelf: updateSelf({ TC: UserTC }),
    userCreatePost: PlaceHolderTC.getResolver('underDevelopment'),
  }),
};
