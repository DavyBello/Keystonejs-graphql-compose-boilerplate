require('require-all')(`${__dirname}/models`);
const app = require('../../app');

app.registerComponent({
  name: 'Enquiry',
  admin: {
    nav: { enquiries: 'enquiries' },
  },
});
