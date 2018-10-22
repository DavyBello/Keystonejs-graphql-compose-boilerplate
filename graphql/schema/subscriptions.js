// Get logic middleware
// const {
//   authAccess,
// } = require('../logic/authentication');

const {
  testSub,
} = require('../resolvers/subscriptions');

// Add fields and resolvers to rootQuery
module.exports = {
  testSub,
};
