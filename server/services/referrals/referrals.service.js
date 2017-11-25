// Initializes the `referrals` service on path `/api/referrals`
const createService = require('feathers-mongoose');
const createModel = require('../../models/referrals.model');
const hooks = require('./referrals.hooks');
const filters = require('./referrals.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'referrals',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/referrals', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/referrals');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
