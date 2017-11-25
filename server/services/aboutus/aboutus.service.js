// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/aboutus.model');
const hooks = require('./aboutus.hooks');
const filters = require('./aboutus.filters');
const request = require('request-promise');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'aboutus',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/aboutus', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/aboutus');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

};
