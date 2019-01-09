const keystone = require('keystone');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');

const noviewUserFields = ['password', '_pv', 'social'];

/**
* Mongoose Models
*/
const User = keystone.list('User').model;

const UserTC = composeWithMongoose(User, {
  fields: {
    remove: [...noviewUserFields],
  },
});

// Viewer Field
const ViewerTC = schemaComposer.getOrCreateTC('Viewer', ((TC) => {
  TC.addFields({
    me: UserTC.getType(),
  });

  TC.addResolver({
    kind: 'query',
    name: 'viewer',
    type: TC,
    resolve: ({ context: { viewer } }) => ({ me: viewer }),
  });
}));


/**
* Exports
*/
module.exports = {
  UserTC,
  ViewerTC,
};
