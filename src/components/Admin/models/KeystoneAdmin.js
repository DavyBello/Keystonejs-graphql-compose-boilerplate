/* eslint-disable func-names */
const { List, Field: { Types } } = require('keystone');

/**
 * keystoneAdmin Model
 * ==========
 */
const keystoneAdmin = new List('keystoneAdmin', {
  track: true,
});

keystoneAdmin.add({
  name: { type: Types.Text, index: true },
  email: {
    type: Types.Email, initial: true, required: true, unique: true, index: true,
  },
  password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
  recieveGuestEnquiries: { type: Boolean, label: 'receives notification email when an equiry is made', index: true },
});

// Provide access to Keystone
keystoneAdmin.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin;
});

/**
 * Registration
 */
keystoneAdmin.defaultColumns = 'name, email, canAccessKeystone, isAdmin';
keystoneAdmin.register();
