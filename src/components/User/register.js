const app = require('../../app');
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
});
