// Get logic middleware
// const { authAccess } = require('../utils/authentication');

// const { addPost } = require('../resolvers/mutations');

const {
  PostTC,
} = require('./typeComposers');

module.exports = {
  posts: PostTC.getResolver('findMany'),
  postOne: PostTC.getResolver('findOne'),
};
