// Add fields and resolvers to rootQuery
module.exports = {
  currentTime: {
    type: 'Date',
    resolve: () => new Date().toISOString(),
  },
};
