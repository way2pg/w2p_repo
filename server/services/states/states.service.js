// Initializes the `states` service on path `/api/states`
const createService = require('feathers-mongoose');
const createModel = require('../../models/states.model');
const hooks = require('./states.hooks');
const filters = require('./states.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'states',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/states', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/states');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
