const baseTypeComposers = require('./core/composers');

// Add resolvers to Type Composers
require('./core/resolvers');

const baseQueries = require('./core/queries');
const baseMutations = require('./core/mutations');

module.exports = {
  typeComposers: { ...baseTypeComposers },
  queries: { ...baseQueries },
  mutations: { ...baseMutations },
  subscriptions: { },
  _relationships: [],
  // addRelationships: () => {
  //   console.log(this._relationships);
  //   if (this._relationships.length) {
  //     this._relationships.map(rel => rel());
  //   }
  // },
};
