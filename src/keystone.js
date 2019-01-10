/* eslint-disable global-require */
// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
const keystone = require('keystone');
const handlebars = require('express-handlebars');
const Cryptr = require('cryptr');

const { checkEnv } = require('./utils/initApp');
const mailgunUtils = require('./utils/mailgunUtils');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  name: 'Keystonejs-graphql-compose-boilerplate',
  brand: 'Keystonejs Graphql Compose Boilerplate',
  // less: 'public',
  static: 'public',
  favicon: 'public/favicon.ico',
  // views: 'templates/views',
  'view engine': '.hbs',

  'custom engine': handlebars.create({
    helpers: require('../templates/helpers')(),
    extname: '.hbs',
  }).engine,

  emails: 'templates/emails',

  'auto update': true,
  session: true,
  auth: true,
  'user model': 'Admin',
});

// Load your project's Components
require('./app/components');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  // posts: ['Post', 'PostCategory'],
  // users: 'User',
  admins: 'Admin',
});

// Configure cloudinary
// keystone.set('cloudinary config', process.env.CLOUDINARY_URL);

// Configure emails(optional)
keystone.set('brandDetails', {
  brand: keystone.get('brand'),
  mailAddress: '22 Someplace, Fort Royal Homes, Abuja',
  homepageUrl: process.env.FRONT_END_URL,
  phone: '+234.818.855.5611',
  emailLogoUrl: 'https://graphql-compose.github.io/img/logo.png',
});


checkEnv([
  'JWT_SECRET',
  'PASSWORD_VERSION_SECRET',
  'CODEGEN_JWT_SECRET',
]);

mailgunUtils.checkMailgun();

keystone.pvCryptr = new Cryptr(process.env.PASSWORD_VERSION_SECRET);

// const apolloServer = require('./apolloServer');

// Start Keystone to connect to your database and initialise the web server
keystone.start({
  // onStart: () => {
  //   const server = keystone.httpsServer
  //     ? keystone.httpsServer : keystone.httpServer;

  //   apolloServer.installSubscriptionHandlers(server);
  // },
});
