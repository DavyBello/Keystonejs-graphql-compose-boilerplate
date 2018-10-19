const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const eJwt = require('express-jwt');

const schema = require('../graphql/schema');
const getContext = require('../graphql/lib/getContext');
// const corsOptions = require('../config/corsOptions');
const services = require('../lib/services');

const emailRoutes = require('./emails');

require('./passport');

const apiPath = '/graphql';

// Setup Route Bindings
module.exports = (app) => {
  // Views
  app.get('/admin', (req, res) => { res.redirect('/keystone'); });
  app.get('/', (req, res) => { res.redirect('/keystone'); });

  app.use(
    apiPath,
    eJwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }),
  );

  const server = new ApolloServer({
    cors,
    schema,
    context: ({ req, res }) => ({
      ...getContext({ jwtPayload: req.user }),
      services,
      req,
      res,
    }),
  });

  server.applyMiddleware({
    app,
    path: apiPath,
  });

  if (process.env.NODE_ENV !== 'production') {
    // route for rendering emails without sending them
    app.use('/test-emails', emailRoutes);
  }
};
