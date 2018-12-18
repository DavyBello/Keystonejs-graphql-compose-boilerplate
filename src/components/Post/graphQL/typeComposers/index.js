const { composeWithMongoose } = require('graphql-compose-mongoose');
const keystone = require('keystone');

/**
* Mongoose Models
*/
const Post = keystone.list('Post').model;
const PostCategory = keystone.list('PostCategory').model;

const PostTC = composeWithMongoose(Post);
const PostCategoryTC = composeWithMongoose(PostCategory);

/**
* Exports
*/
module.exports = {
  PostTC,
  PostCategoryTC,
};
