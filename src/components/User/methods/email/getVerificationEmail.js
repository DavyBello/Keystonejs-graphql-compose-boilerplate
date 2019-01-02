const keystone = require('keystone');

const prepareEmail = require('../../../../lib/prepareEmail');
const createAccountVerificationCode = require('../../lib/createAccountVerificationCode');

module.exports = function getVerificationEmail() {
  const user = this;

  if (user.isVerified) return (Error('Account is already verified'));

  const brandDetails = keystone.get('brandDetails');

  const code = createAccountVerificationCode(user);
  const activationLink = `${process.env.FRONT_END_URL}/activate?code=${code}`;

  return prepareEmail({
    options: {
      templateName: 'user/activate-account',
      transport: 'mailgun',
    },
    locals: {
      to: [user.email],
      from: {
        name: 'Graphql Boilerplate',
        email: 'no-reply@keystonegraphqlboilerplate.com',
      },
      subject: 'Account Activation',
      user,
      brandDetails,
      activationLink,
    },
  });
};
