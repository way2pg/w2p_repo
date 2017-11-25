// Initializes the `countries` service on path `/api/countries`
const createService = require('feathers-mongoose');
const createModel = require('../../models/countries.model');
const hooks = require('./countries.hooks');
const filters = require('./countries.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'countries',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/countries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/countries');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
