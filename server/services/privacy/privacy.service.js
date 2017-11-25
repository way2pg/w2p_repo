// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/privacy.model');
const hooks = require('./privacy.hooks');
const filters = require('./privacy.filters');
const request = require('request-promise');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'privacy',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/privacy', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/privacy');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

};
