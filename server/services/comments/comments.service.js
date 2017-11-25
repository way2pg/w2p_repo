// Initializes the `comments` service on path `/api/comments`
const createService = require('feathers-mongoose');
const createModel = require('../../models/comments.model');
const hooks = require('./comments.hooks');
const filters = require('./comments.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'comments',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/comments', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/comments');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
