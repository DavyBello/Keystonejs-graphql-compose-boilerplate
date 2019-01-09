const keystone = require('keystone');

const prepareEmail = require('../../../../lib/prepareEmail');
const createPasswordResetCode = require('../../lib/createPasswordResetCode');

module.exports = function getPasswordResetLinkEmail() {
  const user = this;

  const brandDetails = keystone.get('brandDetails');

  const code = createPasswordResetCode(user);
  const resetLink = `${process.env.FRONT_END_URL}/forgot/change?code=${code}`;

  return prepareEmail({
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
