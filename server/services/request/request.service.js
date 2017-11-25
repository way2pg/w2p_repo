// Initializes the `request` service on path `/api/requests`
const createService = require('feathers-mongoose');
const createModel = require('../../models/request.model');
const hooks = require('./request.hooks');
const filters = require('./request.filters');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'request',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/requests', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/requests');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", request => {
    if (!_.isNull(request)) {
      app.service("/api/mail").emit("service_request_raised", request);
    }
  })

  service.on("patched", request => {
    if (!_.isNull(request)) {
      app.service("/api/mail").emit("service_request_updated", request);
    }
  })
};
