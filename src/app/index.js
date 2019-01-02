const { merge } = require('lodash');
const caller = require('caller');
const {
  queries,
  mutations,
  subscriptions,
  typeComposers,
  _relationships,
} = require('../graphQL');
const coreServices = require('../lib/services');

module.exports = {
  Components: {},

  registerComponent(packageInfo) {
    // Mutate globals with package info
    packageInfo.dirname = caller();
    // console.log(packageInfo);
    const { name, graphQL, services } = packageInfo;
    if (graphQL) {
      if (graphQL.queries) {
        merge(queries, graphQL.queries);
      }
      if (graphQL.mutations) {
        merge(mutations, graphQL.mutations);
      }
      if (graphQL.subscriptions) {
        merge(subscriptions, graphQL.subscriptions);
      }
      if (graphQL.typeComposers) {
        merge(typeComposers, graphQL.typeComposers);
      }
      if (graphQL.addRelationships) {
        if (graphQL.addRelationships instanceof Function) {
          _relationships.push(graphQL.addRelationships);
        } else {
          throw new Error('expected addRelatinship to be a function');
        }
      }
    }

    if (services) {
      merge(coreServices, services);
    }

    // if (functionsByType) {
    //     Object.keys(functionsByType).forEach((type) => {
    //         if (!Array.isArray(functionsByType[type])) {
    //             functionsByType[type] = [];
    //         }
    //         functionsByType[type].push(...functionsByType[type]);
    //     });
    // }

    // Save the package info
    if (!this.Components[name]) {
      this.Components[name] = packageInfo;
      const registeredComponent = this.Components[name];
      return registeredComponent;
    }
    throw new Error(`A Component named ${name} has already been registered`);
  },
};
