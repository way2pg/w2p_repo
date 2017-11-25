// Initializes the `groups` service on path `/api/groups`
const createService = require('feathers-mongoose');
const createModel = require('../../models/groups.model');
const hooks = require('./groups.hooks');
const filters = require('./groups.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'groups',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/groups', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/groups');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
