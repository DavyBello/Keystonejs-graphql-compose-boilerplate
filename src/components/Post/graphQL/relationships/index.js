const {
  PostTC,
  PostCategoryTC,
} = require('../typeComposers');
const { typeComposers: { UserTC } } = require('../../../../graphQL');

PostTC.addRelation('categories', {
  resolver: () => PostCategoryTC.getResolver('findByIds'),
  prepareArgs: {
    _ids: source => source.categories,
  },
  projection: { categories: 1 },
});
PostTC.addRelation('author', {
  resolver: () => UserTC.getResolver('findById'),
  prepareArgs: {
    _id: source => source.authorId,
  },
  projection: { authorId: 1 },
});
