const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const {iff, populate, client, setCreatedAt, setUpdatedAt,discard} = require('feathers-hooks-common');

function populateUser(authConfig) {
  return hook => hook.app.passport.verifyJWT(hook.result.accessToken, authConfig)
    .then(payload => hook.app.service('/api/users').get(payload.userId))
    .then(user => {
      hook.result.user = user;
    });
}

module.exports = function () {
  const app = this;
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local(config.local));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        populateUser(config),
        //discard('user.password'),
      ]
    }
  });

};
