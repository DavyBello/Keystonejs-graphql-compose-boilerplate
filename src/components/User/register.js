require('require-all')(`${__dirname}/models`);
const app = require('../../app');

// Configure passport
// require('./lib/passport');

const typeComposers = require('./graphQL/typeComposers');

// Add resolvers to Type Composers
require('./graphQL/resolvers');

const mutations = require('./graphQL/mutations');
const queries = require('./graphQL/queries');

app.registerComponent({
  name: 'User',
  graphQL: {
    typeComposers,
    mutations,
    queries,
  },
  admin: {
    nav: { users: 'User' },
  },
  services: {
    sendVerificationEmail: user => user.getVerificationEmail().send(),
    sendPasswordResetLinkEmail: user => user.getPasswordResetLinkEmail().send(),
  },
});
