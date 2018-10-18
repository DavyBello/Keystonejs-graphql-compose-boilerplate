const keystone = require('keystone');
const jwt = require('jsonwebtoken');

const handleEmail = require('../../../lib/handleEmail');

module.exports = async function handlePasswordResetLinkEmail(action) {
  const user = this;
  console.log('sending password reset email');

  const brandDetails = keystone.get('brandDetails');

  const code = jwt.sign({
    id: user._id,
    createdAt: Date.now(),
    pv: keystone.pvCryptr.encrypt(user.passwordVersion),
  }, process.env.ACTIVATION_JWT_SECRET);
  const resetLink = `${process.env.FRONT_END_URL}/forgot/change?code=${code}`;

  return handleEmail({
    action,
    options: {
      templateName: 'user/reset-password',
      transport: 'mailgun',
    },
    locals: {
      to: [user.email],
      from: {
        name: 'Graphql Boilerplate',
        email: 'no-reply@keystonegraphqlboilerplate.com',
      },
      subject: 'Password Reset',
      user,
      brandDetails,
      resetLink,
    },
  });
};