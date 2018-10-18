const sendActivationLink = require('./sendActivationLink');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signToken = require('./auth/signToken');
const upsertGoogleUser = require('./auth/upsertGoogleUser');
const encryptPasswordVersion = require('./auth/encryptPasswordVersion');
const decodeToken = require('./auth/decodeToken');

module.exports = {
  sendActivationLink,
  sendPasswordResetLink,
  signToken,
  upsertGoogleUser,
  encryptPasswordVersion,
  decodeToken,
};
