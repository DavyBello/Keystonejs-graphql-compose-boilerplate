const { PlaceHolderTC } = require('./composers');

module.exports = {
  time: {
    type: 'Date',
    resolve: () => Date.now(),
  },
  status: PlaceHolderTC.getResolver('underDevelopment'),
};
