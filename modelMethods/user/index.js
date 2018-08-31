const sendActivationLink = require('./sendActivationLink');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signToken = require('./signToken');
const decodeToken = require('./decodeToken');

module.exports = {
  sendActivationLink,
  sendPasswordResetLink,
  signToken,
  decodeToken,
};
