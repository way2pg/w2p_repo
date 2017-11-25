// Initializes the `expense` service on path `/api/expense`
const createService = require('feathers-mongoose');
const createModel = require('../../models/expense.model');
const hooks = require('./expense.hooks');
const filters = require('./expense.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'expense',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/expense', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/expense');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
