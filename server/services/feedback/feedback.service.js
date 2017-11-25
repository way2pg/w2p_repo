// Initializes the `feedback` service on path `/api/feedback`
const createService = require('feathers-mongoose');
const createModel = require('../../models/feedback.model');
const hooks = require('./feedback.hooks');
const filters = require('./feedback.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'feedback',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/feedback', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/feedback');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
