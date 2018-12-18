const { authAccess } = require('../../../graphQL/utils/authentication');
const { updateSelf } = require('../../../graphQL/utils/common');
const { typeComposers: { PlaceHolderTC } } = require('../../../graphQL');

const { UserTC } = require('./typeComposers');

module.exports = {
  loginUser: UserTC.getResolver('loginWithEmail'),
  authGoogle: UserTC.getResolver('loginWithGoogle'),
  userCreateAccount: UserTC.getResolver('createAccount'),
  userVerifyAccount: UserTC.getResolver('verifyAccount'),
  userSendPasswordResetLink: UserTC.getResolver('sendPasswordResetLinkEmail'),
  userResetPassword: UserTC.getResolver('resetPassword'),

  // Authorized user mutations
  ...authAccess({ scope: 'User' }, {
    userResendVerificationLink: UserTC.getResolver('sendVerificationEmail'),
    userChangePassword: UserTC.getResolver('changePassword'),
    userUpdateSelf: updateSelf({ TC: UserTC }),
    userCreatePost: PlaceHolderTC.getResolver('underDevelopment'),
  }),
};
