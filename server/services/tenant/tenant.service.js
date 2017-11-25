// Initializes the `tenant` service on path `/api/tenants`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tenant.model');
const hooks = require('./tenant.hooks');
const filters = require('./tenant.filters');
const _ = require('lodash')

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tenant',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/tenants', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/tenants');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", tenant => {

    if (!_.isNull(tenant)) {
      app.service("/api/mail").emit("add_tenant", tenant);
      app.service("/api/sms").emit("add_tenant", tenant);
      app.service("/api/pgreport").emit("update_pg_report", {});
      app.service("/api/expenseitem").find({
        query: {
          expense_item: "Room Rent",
          createdBy: tenant.tenant.createdBy,
          pgowner:tenant.tenant.pgowner,
          $client: {
            group: true
          }
        }
      }).then(response => {
        if (!_.isEmpty(response[0])) {
          app.service("/api/expense").create(
            {
              "comments": "Room Rent",
              "amount": _.toNumber(tenant.advanceAmount) + _.toNumber(tenant.paidAmount),
              "date": tenant.joinedDate,
              "user": tenant.tenant._id,
              "pgowner":tenant.tenant.pgowner,
              "first_rent": true,
              "expense_group": response[0].expense_group._id,
              "expense_item": response[0]._id,
              "createdAt": new Date(),
              "createdBy": tenant.tenant.createdBy,
              "updatedAt": new Date(),
              "updatedBy": tenant.tenant.createdBy,
              "salary": false,
              "rent": true,
            })
        }

      })
    }

  })
  service.on("patched", tenant => {
    if (!_.isNull(tenant)) {
      app.service("/api/pgreport").emit("update_pg_report", {});
      app.service("/api/expense").find({
        query: {
          user: tenant.tenant._id,
          first_rent: true,
          createdBy: tenant.tenant.createdBy,
        }
      }).then(response => {
        if (!_.isEmpty(response[0])) {
          app.service("/api/expense").patch(response[0]._id,
            {
              "comments": "Room Rent",
              "amount": _.toNumber(tenant.advanceAmount) + _.toNumber(tenant.paidAmount),
              "date": tenant.joinedDate,
              "user": tenant.tenant._id,
              "expense_group": response[0].expense_group._id,
              "expense_item": response[0]._id,
              "createdAt": new Date(),
              "createdBy": tenant.tenant.createdBy,
              "updatedAt": new Date(),
              "updatedBy": tenant.tenant.createdBy,
              "salary": false,
              "rent": true,
            })
        }

      })
    }

  })
};
