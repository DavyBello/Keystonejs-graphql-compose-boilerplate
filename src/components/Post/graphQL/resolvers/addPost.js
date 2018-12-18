const { pubsub, events: { POST_ADDED } } = require('../../../../graphQL/lib/subscriptionsUtils');

const posts = [];

module.exports = {
  type: 'String',
  args: {
    post: 'String!',
  },
  resolve: async (_, args) => {
    // get args
    // return postController.addPost(args);
    posts.push(args.post);
    pubsub.publish(POST_ADDED, args.post);
    return (args.post);
  },
};
