// Initializes the `pgdetails` service on path `/api/pgdetails`
const createService = require('feathers-mongoose');
const createModel = require('../../models/pgdetails.model');
const hooks = require('./pgdetails.hooks');
const filters = require('./pgdetails.filters');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'pgdetails',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/pgdetails', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/pgdetails');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", pgdetails => {
    if (!_.isNull(pgdetails)) {
      app.service("/api/mail").emit("add_pg", pgdetails);
      app.service("/api/sms").emit("add_pg", pgdetails);
      app.service("/api/pgreport").emit("update_pg_report", {});
    }
  })
  service.on("updated", pgdetails => {
    if (!_.isNull(pgdetails)) {
      app.service("/api/mail").emit("update_pg", pgdetails);
      app.service("/api/sms").emit("update_pg", pgdetails);
      app.service("/api/pgreport").emit("update_pg_report", {});
    }

  })
  service.on("patched", pgdetails => {
    if (!_.isNull(pgdetails)) {
      if (pgdetails.deleted) {
        app.service("/api/mail").emit("deactivated_user", pgdetails);
        app.service("/api/sms").emit("deactivated_user", pgdetails);
        app.service("/api/pgreport").emit("update_pg_report", {});
      }
    }
  })

  service.on("removed", pgdetails => {
    if (!_.isNull(pgdetails)) {
      if (pgdetails.deleted) {
        app.service("/api/pgreport").emit("update_pg_report", {});
      }
    }
  })


  service.filter('created', function (data, connection, hook) {
    if (_.isEqual(data.createdBy, connection.user._id)) {
      return data;
    }
  })
};
