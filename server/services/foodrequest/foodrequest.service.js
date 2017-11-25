// Initializes the `foodrequest` service on path `/api/foodrequest`
const createService = require('feathers-mongoose');
const createModel = require('../../models/foodrequest.model');
const hooks = require('./foodrequest.hooks');
const filters = require('./foodrequest.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'foodrequest',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/foodrequest', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/foodrequest');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
  service.on("created", foodreport => {
    console.log(foodreport)
    app.service("/api/foodreport").emit("update_food_report", {pgowner: foodreport.pgowner})
  })

  service.on("removed", foodreport => {
    console.log(foodreport)
    app.service("/api/foodreport").emit("update_food_report", {pgowner: foodreport.pgowner})
  })

};
