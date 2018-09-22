const sendActivationLink = require('./sendActivationLink');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signToken = require('./signToken');
const upsertGoogleUser = require('./upsertGoogleUser');
const encryptPasswordVersion = require('./encryptPasswordVersion');
const decodeToken = require('./decodeToken');

module.exports = {
  sendActivationLink,
  sendPasswordResetLink,
  signToken,
  upsertGoogleUser,
  encryptPasswordVersion,
  decodeToken,
};
