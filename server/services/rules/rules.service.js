// Initializes the `rules` service on path `/api/rules`
const createService = require('feathers-mongoose');
const createModel = require('../../models/rules.model');
const hooks = require('./rules.hooks');
const filters = require('./rules.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rules',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/rules', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/rules');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};