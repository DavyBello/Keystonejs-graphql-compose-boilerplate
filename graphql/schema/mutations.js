// Get logic middleware
const {
  authAccess,
} = require('../utils/authentication');
const {
  updateSelf,
} = require('../utils/common');
const {
  addPost,
} = require('../resolvers/mutations');

const {
  UserTC,
  PlaceHolderTC,
} = require('../composers');

module.exports = {
  addPost,

  // unauthorized user mutations
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
