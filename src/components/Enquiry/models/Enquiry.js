/* eslint-disable func-names */
const { List, Field: { Types } } = require('keystone');

/**
 * Enquiry Model
 * =============
 */

const Enquiry = new List('Enquiry', {
  nocreate: true,
  noedit: true,
});

Enquiry.add({
  name: { type: Types.Name, required: true },
  email: { type: Types.Email, required: true },
  phone: { type: String },
  enquiryType: {
    type: Types.Select,
    options: [
      { value: 'message', label: 'Just leaving a message' },
      { value: 'question', label: 'I\'ve got a question' },
      { value: 'other', label: 'Something else...' },
    ],
  },
  message: { type: Types.Markdown, required: true },
  createdAt: { type: Date, default: Date.now },
});

Enquiry.schema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

Enquiry.schema.post('save', async function () {
  if (this.wasNew) {
    (await this.getNotificationEmail()).send();
  }
});

const {
  getNotificationEmail,
} = require('../methods');

Enquiry.schema.methods.getNotificationEmail = getNotificationEmail;

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
