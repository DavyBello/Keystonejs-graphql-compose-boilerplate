const handleActivationLinkEmail = require('./email/handleActivationLinkEmail');
const handlePasswordResetLinkEmail = require('./email/handlePasswordResetLinkEmail');
const signToken = require('./auth/signToken');
const upsertGoogleUser = require('./auth/upsertGoogleUser');
const encryptPasswordVersion = require('./auth/encryptPasswordVersion');
const decodeToken = require('./auth/decodeToken');

module.exports = {
  handleActivationLinkEmail,
  handlePasswordResetLinkEmail,
  signToken,
  upsertGoogleUser,
  encryptPasswordVersion,
  decodeToken,
};
