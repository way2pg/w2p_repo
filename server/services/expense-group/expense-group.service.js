// Initializes the `category` service on path `/api/category`
const createService = require('feathers-mongoose');
const createModel = require('../../models/expense-group.model');
const hooks = require('./expense-group.hooks');
const filters = require('./expense-group.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'expense-group',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/expensegroup', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/expensegroup');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
