// Initializes the `auth-management` service on path `/api/auth-management`
const authManagement = require('feathers-authentication-management');
const createService = require('./auth-management.class.js');
const hooks = require('./auth-management.hooks');
const filters = require('./auth-management.filters');

const notifier = require('./notifier');


module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    service: '/api/users',
    notifier:notifier(app).notifier
  };

  // Initialize our service with any options it requires
  app.configure(authManagement(options,));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('authManagement');
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
