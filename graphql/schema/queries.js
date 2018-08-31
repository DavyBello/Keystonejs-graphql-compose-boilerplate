// Get logic middleware
const {
  authAccess,
} = require('../logic/authentication');

const {
  UserTC,
  ViewerTC,
  PostTC,
} = require('../composers');

// Add fields and resolvers to rootQuery
module.exports = {
  posts: PostTC.getResolver('findMany'),
  ...authAccess({ scope: 'User' }, {
    candidateIsAuthenticated: UserTC.getResolver('isAuthenticated'),
    Viewer: ViewerTC.getResolver('viewer'),
  }),
  currentTime: {
    type: 'Date',
    resolve: () => new Date().toISOString(),
  },
};
