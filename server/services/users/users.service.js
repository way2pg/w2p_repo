// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');
const filters = require('./users.filters');
const _ = require('lodash');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users');

  //service.Model.createIndex({ "$**": "text" })
  
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("created", user => {
    if (!_.isNull(user)) {
      app.service("/api/reports").emit("update_user_report", {})
      if (_.isEqual(user.role, "user")) {
        app.service("/api/mail").emit("add_user", user);
        app.service("/api/sms").emit("add_user", user);
      } else if (_.isEqual(user.role, "pgowner")) {
        add_defaults(user)
        app.service("/api/mail").emit("add_pgowner", user);
        app.service("/api/sms").emit("add_pgowner", user);
      } else if (_.isEqual(user.role, "pgstaff")) {
        app.service("/api/mail").emit("add_pgstaff", user);
        app.service("/api/sms").emit("add_pgstaff", user);
      } else if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "admin")) {
        app.service("/api/mail").emit("add_admin", user);
        app.service("/api/sms").emit("add_admin", user);
      } else if (_.isEqual(user.role, "tenant")) {
        update_group(user)
      }
    }

  })
  service.on("updated", user => {
    if (!_.isNull(user)) {
      app.service("/api/reports").emit("update_user_report", {})
      if (_.isEqual(user.role, "user")) {
        app.service("/api/mail").emit("update_user", user);
      } else if (_.isEqual(user.role, "pgowner")) {
        app.service("/api/mail").emit("update_pgowner", user);
      } else if (_.isEqual(user.role, "tenant")) {
        app.service("/api/mail").emit("update_tenant", user);
      } else if (_.isEqual(user.role, "pgstaff")) {
        app.service("/api/mail").emit("update_pgstaff", user);
      } else if (_.isEqual(user.role, "admin")) {
        app.service("/api/mail").emit("update_admin", user);
      }
    }

  })
  service.on("patched", user => {
    if (!_.isNull(user)) {
      if (user.deleted) {
        app.service("/api/reports").emit("update_user_report", {})
        if (_.isEqual(user.role, "user")) {
          app.service("/api/mail").emit("deactivated_user", user);
          app.service("/api/sms").emit("deactivated_user", user);
        } else if (_.isEqual(user.role, "pgowner")) {
          app.service("/api/mail").emit("deactivated_pgowner", user);
          app.service("/api/sms").emit("deactivated_pgowner", user);
        } else if (_.isEqual(user.role, "tenant")) {
          update_group(user)
          app.service("/api/mail").emit("deactivated_tenant", user);
          app.service("/api/sms").emit("deactivated_tenant", user);
        } else if (_.isEqual(user.role, "pgstaff")) {
          app.service("/api/mail").emit("deactivated_pgstaff", user);
          app.service("/api/sms").emit("deactivated_pgstaff", user);
        } else if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "superadmin")) {
          app.service("/api/mail").emit("deactivated_admin", user);
          app.service("/api/sms").emit("deactivated_admin", user);
        }
      } else {
        if (_.isEqual(user.role, "user")) {
          app.service("/api/mail").emit("update_user", user);
          app.service("/api/sms").emit("update_user", user);
        } else if (_.isEqual(user.role, "pgowner")) {
          app.service("/api/mail").emit("update_pgowner", user);
          app.service("/api/sms").emit("update_pgowner", user);
        } else if (_.isEqual(user.role, "tenant")) {
          app.service("/api/mail").emit("update_tenant", user);
          app.service("/api/sms").emit("update_tenant", user);
        } else if (_.isEqual(user.role, "pgstaff")) {
          app.service("/api/mail").emit("update_pgstaff", user);
          app.service("/api/sms").emit("update_pgstaff", user);
        } else if (_.isEqual(user.role, "admin") || _.isEqual(user.role, "superadmin")) {
          app.service("/api/mail").emit("update_admin", user);
          app.service("/api/sms").emit("update_admin", user);
        }
      }
    }

  })

  function add_defaults(user) {
    app.service("/api/expensegroup").create({
      "expense_group": "Room Rent",
      "comments": "Room Rent",
      "salary": false,
      "rent": true,
      "isFixed": true,
      "createdAt": new Date(),
      "createdBy": user._id,
      "updatedAt": new Date(),
      "updatedBy": user._id,
    }).then(response => {
      if (!_.isEmpty(response)) {
        app.service("/api/expenseitem").create({
          "expense_item": "Room Rent",
          "operation": "Credit",
          "comments": "Room Rent",
          "expense_group": response._id,
          "isFixed": true,
          "createdAt": new Date(),
          "createdBy": user._id,
          "updatedAt": new Date(),
          "updatedBy": user._id,
        })
      }
    })

    app.service("/api/expensegroup").create({
      "expense_group": "Wages",
      "comments": "Wages",
      "salary": true,
      "rent": false,
      "isFixed": true,
      "createdAt": new Date(),
      "createdBy": user._id,
      "updatedAt": new Date(),
      "updatedBy": user._id,
    }).then(response => {
      if (!_.isEmpty(response)) {
        app.service("/api/expenseitem").create({
          "expense_item": "Manager",
          "operation": "Debit",
          "comments": "Manager Salary",
          "expense_group": response._id,
          "isFixed": true,
          "createdAt": new Date(),
          "createdBy": user._id,
          "updatedAt": new Date(),
          "updatedBy": user._id,
        })
      }
    })

    app.service("/api/groups").create([
      {
        "name": "Tenants",
        "is_tenant_group": true,
        "is_staff_group": false,
        "members": [],
        "createdAt": new Date(),
        "createdBy": user._id,
        "updatedAt": new Date(),
        "updatedBy": user._id,
      },
      {
        "name": "Staff Members",
        "is_tenant_group": false,
        "is_staff_group": true,
        "members": [],
        "createdAt": new Date(),
        "createdBy": user._id,
        "updatedAt": new Date(),
        "updatedBy": user._id,
      }
    ]);

  }

  function update_group(user) {
    console.log("================ Inside Update Group Start =====================")
    console.log(user)
    app.service("/api/users").find({
      query: {
        createdBy: user.createdBy,
        role: "tenant",
        $select: ["_id"]
      }
    }).then(tenants => {
      console.log(tenants)
      app.service("/api/groups").find({
        query: {
          createdBy: user.createdBy,
          is_tenant_group: true
        }
      }).then(groups => {
        console.log(groups)
        if (!_.isEmpty(groups)) {
          groups[0].members = _.map(tenants, '_id')
          app.service("/api/groups").patch(groups[0]._id, groups[0])
          console.log("================ Inside Update Group End =====================")
        }
      })
    })
  }
};
