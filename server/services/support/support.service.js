// Initializes the `request` service on path `/api/requests`
const createService = require('feathers-mongoose');
const createModel = require('../../models/support.model');
const hooks = require('./support.hooks');
const filters = require('./support.filters');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'support',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/support', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/support');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", request => {
    if (!_.isNull(request)) {
      app.service("/api/mail").emit("support_request_raised", request);
    }
  })

  service.on("patched", request => {
    if (!_.isNull(request)) {
      app.service("/api/mail").emit("support_request_updated", request);
    }
  })
};
