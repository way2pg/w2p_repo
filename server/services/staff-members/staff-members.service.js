// Initializes the `staff-members` service on path `/api/staffmembers`
const createService = require('feathers-mongoose');
const createModel = require('../../models/staff-members.model');
const hooks = require('./staff-members.hooks');
const filters = require('./staff-members.filters');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'staff-members',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/staffmembers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/staffmembers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
  service.on("created", staffdetails => {
    if (!_.isNull(staffdetails)) {
      app.service("/api/pgreport").emit("update_pg_report", {});
    }
  })
  service.on("updated", staffdetails => {
    if (!_.isNull(staffdetails)) {
      app.service("/api/pgreport").emit("update_pg_report", {});
    }

  })
  service.on("patched", pgdetails => {
    if (!_.isNull(pgdetails)) {
      if (staffdetails.deleted) {
        app.service("/api/pgreport").emit("update_pg_report", {});
      }
    }
  })

  service.on("removed", staffdetails => {
    if (!_.isNull(staffdetails)) {
      if (staffdetails.deleted) {
        app.service("/api/pgreport").emit("update_pg_report", {});
      }
    }
  })
};
