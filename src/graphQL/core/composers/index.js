const { schemaComposer } = require('graphql-compose');

const PlaceHolderTC = schemaComposer.getOrCreateTC('PlaceHolder');

/**
* Exports
*/
module.exports = {
  PlaceHolderTC,
};
