// Initializes the `rooms` service on path `/api/rooms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/rooms.model');
const hooks = require('./rooms.hooks');
const filters = require('./rooms.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rooms',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/rooms', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/rooms');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
