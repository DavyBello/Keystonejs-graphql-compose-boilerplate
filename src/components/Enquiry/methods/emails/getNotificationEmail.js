/* eslint-disable func-names */
const keystone = require('keystone');

const prepareEmail = require('../../../../lib/prepareEmail');

module.exports = async function () {
  const enquiry = this;
  const brand = keystone.get('brand');

  const Admin = keystone.list('Admin').model;
  const admins = await Admin.find({ recieveGuestEnquiries: true });

  return prepareEmail({
    options: {
      templateName: 'enquiry/enquiry-notification',
      transport: 'mailgun',
    },
    locals: {
      to: admins,
      from: {
        name: 'Graphql Boilerplate',
        email: 'no-reply@keystonegraphqlboilerplate.com',
      },
      subject: 'New Enquiry for My Site',
      enquiry,
      brand,
      layout: false,
    },
  });
};
