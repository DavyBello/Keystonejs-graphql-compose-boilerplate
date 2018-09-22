const { UserTC } = require('../../composers');

// Queries
UserTC.addResolver(require('./isAuthenticated'));

// Mutations
UserTC.addResolver(require('./loginWithEmail'));
UserTC.addResolver(require('./loginWithGoogle'));
UserTC.addResolver(require('./createAccount'));
UserTC.addResolver(require('./activateAccount'));
UserTC.addResolver(require('./sendPasswordResetLink'));
UserTC.addResolver(require('./resetPassword'));
UserTC.addResolver(require('./sendUserActivationLink'));
UserTC.addResolver(require('./changePassword'));
