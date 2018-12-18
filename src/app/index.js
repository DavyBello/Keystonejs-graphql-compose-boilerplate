const { merge } = require('lodash');
const {
  queries,
  mutations,
  subscriptions,
  typeComposers,
  _relationships,
} = require('../graphQL');

module.exports = {
  Components: {},

  registerComponent(packageInfo) {
    // Mutate globals with package info
    if (packageInfo.graphQL) {
      if (packageInfo.graphQL.queries) {
        merge(queries, packageInfo.graphQL.queries);
      }
      if (packageInfo.graphQL.mutations) {
        merge(mutations, packageInfo.graphQL.mutations);
      }
      if (packageInfo.graphQL.subscriptions) {
        merge(subscriptions, packageInfo.graphQL.subscriptions);
      }
      if (packageInfo.graphQL.typeComposers) {
        merge(typeComposers, packageInfo.graphQL.typeComposers);
      }
      if (packageInfo.graphQL.addRelationships) {
        if (packageInfo.graphQL.addRelationships instanceof Function) {
          _relationships.push(packageInfo.graphQL.addRelationships);
        } else {
          throw new Error('expected addRelatinship to be a function');
        }
      }
    }

    // if (packageInfo.functionsByType) {
    //     Object.keys(packageInfo.functionsByType).forEach((type) => {
    //         if (!Array.isArray(functionsByType[type])) {
    //             functionsByType[type] = [];
    //         }
    //         functionsByType[type].push(...packageInfo.functionsByType[type]);
    //     });
    // }

    // Save the package info
    this.Components[packageInfo.name] = packageInfo;
    const registeredComponent = this.Components[packageInfo.name];
    return registeredComponent;
  },
};
