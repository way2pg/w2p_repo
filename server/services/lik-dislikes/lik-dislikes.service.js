// Initializes the `lik-dislikes` service on path `/api/like_dislikes`
const createService = require('feathers-mongoose');
const createModel = require('../../models/lik-dislikes.model');
const hooks = require('./lik-dislikes.hooks');
const filters = require('./lik-dislikes.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'lik-dislikes',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/like_dislikes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/like_dislikes');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
