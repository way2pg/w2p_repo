// Initializes the `page-views` service on path `/api/page_views`
const createService = require('feathers-mongoose');
const createModel = require('../../models/page-views.model');
const hooks = require('./page-views.hooks');
const filters = require('./page-views.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'page-views',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/page_views', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/page_views');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
