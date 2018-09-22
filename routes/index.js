const cors = require('cors');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { ApolloServer } = require('apollo-server-express');

// const schema = require('../graphql/schema-compose');
const schema = require('../graphql/schema');
const getContext = require('../graphql/lib/getContext');
// const corsOptions = require('../config/corsOptions');

require('./passport');

// Setup Route Bindings
module.exports = (app) => {
  // Register API middleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    graphqlExpress((req, res) => new Promise((resolve) => {
      const next = (jwtPayload/* , info = {} */) => {
        resolve({
          schema,
          context: {
            ...getContext({ jwtPayload }),
            req,
            res,
          },
        });
      };

      /**
         * Try to authenticate using passport,
         * but never block the call from here.
         */
      passport.authenticate('jwt', { session: false }, (err, jwtPayload) => {
        if (err) console.log(err);
        next(jwtPayload);
      })(req, res, next);
    })),
  );

  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // const server = new ApolloServer({ schema });
  // server.applyMiddleware({ app });
  // console.log(server);


  // Views
  app.get('/admin', (req, res) => { res.redirect('/keystone'); });
  app.get('/', (req, res) => { res.redirect('/keystone'); });

  // routes for testing in development
  // if (process.env.NODE_ENV === 'development') {
  //   app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  // }
};
