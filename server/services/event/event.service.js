// Initializes the `test` service on path `/api/test`
const createService = require('feathers-mongoose');
const createModel = require('../../models/event.model');
const hooks = require('./event.hooks');
const filters = require('./event.filters');
const _ = require("lodash")
module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'events',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/events', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/events');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created",event => {
    if(_.isEqual(event.name,"Send Mail")){
      app.service("/api/mail").emit("send_mail",event)
    }
    if(_.isEqual(event.name,"Send SMS")){
      console.log(event)
      app.service("/api/sms").emit("send_sms",event)
    }
  })

};
