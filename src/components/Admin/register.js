require('require-all')(`${__dirname}/models`);
const app = require('../../app');

app.registerComponent({
  name: 'Admin',
  admin: {
    nav: { admins: 'Admin' },
  },
});
