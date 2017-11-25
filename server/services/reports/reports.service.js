// Initializes the `reports` service on path `/api/reports`
const createService = require('feathers-mongoose');
const createModel = require('../../models/reports.model');
const hooks = require('./reports.hooks');
const filters = require('./reports.filters');
const _ = require("lodash")
const Nightmare = require('nightmare');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailer = require('feathers-mailer');

var path = require("path");
module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'reports',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/reports', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/reports');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("update_user_report", object => {
    app.service("/api/users").Model.aggregate([
      {$group: {_id: "$role", count: {$sum: 1}}}
    ]).then(response => {
      let query = {};
      _.forEach(response, function (object) {

        if (_.isEqual(object._id, "user")) {
          query["user_count"] = object.count;
        }

        if (_.isEqual(object._id, "admin")) {
          query["admin_count"] = object.count;
        }

        if (_.isEqual(object._id, "superadmin")) {
          query["super_admin_count"] = object.count;
        }

        if (_.isEqual(object._id, "pgowner")) {
          query["pgowner_count"] = object.count;
        }

        if (_.isEqual(object._id, "tenant")) {
          query["tenant_count"] = object.count;
        }

        if (_.isEqual(object._id, "pgstaff")) {
          query["pgstaff_count"] = object.count;
        }

      });

      let roles = response.map(object => object._id);
      if (!_.includes(roles, "user")) {
        query["user_count"] = 0;
      }
      if (!_.includes(roles, "admin")) {
        query["admin_count"] = 0;
      }
      if (!_.includes(roles, "superadmin")) {
        query["super_admin_count"] = 0;
      }
      if (!_.includes(roles, "pgowner")) {
        query["pgowner_count"] = 0;
      }
      if (!_.includes(roles, "tenant")) {
        query["tenant_count"] = 0;
      }
      if (!_.includes(roles, "pgstaff")) {
        query["pgstaff_count"] = 0;
      }

      if (!_.isNull(query)) {
        app.service("/api/reports").find({}).then(reports => {
          if (!_.isEmpty(reports)) {
            app.service("/api/reports").patch(reports[0]._id, query);
          }
        })
      }
    })
  })

  
};
