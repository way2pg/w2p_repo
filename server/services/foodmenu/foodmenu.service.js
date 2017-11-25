// Initializes the `foodmenu` service on path `/api/foodmenu`
const createService = require('feathers-mongoose');
const createModel = require('../../models/foodmenu.model');
const hooks = require('./foodmenu.hooks');
const filters = require('./foodmenu.filters');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'foodmenu',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/foodmenu', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/foodmenu');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", object => {
    console.log(object)
    if (!_.isNull(object)) {
      app.service("/api/mail").emit("add_food_menu", object);
    }
  })
  service.on("patched", object => {
    if (!_.isNull(object)) {
      app.service("/api/mail").emit("update_food_menu", object);
    }
  })
};
