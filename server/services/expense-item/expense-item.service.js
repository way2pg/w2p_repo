// Initializes the `category` service on path `/api/category`
const createService = require('feathers-mongoose');
const createModel = require('../../models/expense-item.model');
const hooks = require('./expense-item.hooks');
const filters = require('./expense-item.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'expense-item',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/expenseitem', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/expenseitem');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
