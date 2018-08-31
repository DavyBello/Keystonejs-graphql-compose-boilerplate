const keystone = require('keystone');
const jwt = require('jsonwebtoken');

const mailgunUtils = require('../../utils/mailgunUtils');

module.exports = function sendActivationLink() {
  const user = this;
  return new Promise(((resolve, reject) => {
    console.log('sending user activation email');
    if (user.isActivated) {
      // console.log('Account is already activated');
      reject(new Error('Account is already activated'));
    } else {
      if (mailgunUtils.isUnavailable) {
        reject(Error('Unable to send email - no mailgun credentials provided'));
      }

      const brandDetails = keystone.get('brandDetails');

      const code = jwt.sign({
        id: user._id,
        createdAt: Date.now(),
      }, process.env.ACTIVATION_JWT_SECRET);
      const activationLink = `${process.env.FRONT_END_URL}/activate?code=${code}`;

      new keystone.Email({
        templateName: 'activate-account',
        transport: 'mailgun',
      }).send({
        to: [user.email],
        from: {
          name: 'Career Intelligence [ MCC, PRET, JP ]',
          email: 'no-reply@boilerplate.com',
        },
        subject: 'Account Activation',
        user,
        brandDetails,
        activationLink,
      }, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        }
      });
      resolve();
    }
  }));
};
