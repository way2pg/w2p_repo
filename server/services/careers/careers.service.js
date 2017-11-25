// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/careers.model');
const hooks = require('./careers.hooks');
const filters = require('./careers.filters');
const request = require('request-promise');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'careers',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/careers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/careers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

};
