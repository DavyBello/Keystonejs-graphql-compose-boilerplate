/* generates a schema based on the database models
*  for GraphQL using graphql-compose
*/
const { schemaComposer } = require('graphql-compose');

const {
  queries,
  mutations,
  subscriptions,
  _relationships,
} = require('./index');

// Add fields to root queries
if (Object.keys(queries).length) {
  schemaComposer.Query.addFields(queries);
}

// Add fields to root mutations
if (Object.keys(mutations).length) {
  schemaComposer.Mutation.addFields(mutations);
}

// Add fields to root subscriptions
if (Object.keys(subscriptions).length) {
  schemaComposer.Subscription.addFields(subscriptions);
}

if (_relationships.length) {
  _relationships.map(rel => rel());
}

const schema = schemaComposer.buildSchema();
module.exports = schema;
