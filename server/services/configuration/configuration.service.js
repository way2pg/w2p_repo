// Initializes the `configuration` service on path `/api/config`
const createService = require('feathers-mongoose');
const createModel = require('../../models/configuration.model');
const hooks = require('./configuration.hooks');
const filters = require('./configuration.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'configuration',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/config', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
