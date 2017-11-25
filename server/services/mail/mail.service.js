// Initializes the `mail` service on path `/api/mail`
const createService = require('feathers-mongoose');
const createModel = require('../../models/mail.model');
const hooks = require('./mail.hooks');
const filters = require('./mail.filters');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailer = require('feathers-mailer');
const Handlebars = require('handlebars');
const _ = require('lodash');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'mail',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/mail', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/mail');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("welcome_mail", (request) => {

    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "welcome", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("support_request_raised", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          request.superadmins.push(request.email)
          send_mail(app, "support_request_raised", mailconfig[0], request.admins, request.superadmins, "", request)
        }
      })
    }
  })

  service.on("add_pgowner", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_pgowner", mailconfig[0], request.email, "", "", request)
        }
      })
    }
  })
  service.on("update_pgowner", (request) => {
    console.log(" ================== Mail Service Update PGOwner ========= ")
    console.log(request)
    console.log(" ================== Mail Service Update PGOwner ========= ")
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_pgowner", mailconfig[0], request.email, "", "", request)
        }
      })
    }
  })
  service.on("deactivate_pgowner", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_pgowner", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_pg", (request) => {
    console.log(request)
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_pg", mailconfig[0], request.pgowner.email, "", "", request)
        }
      })
    }
  })
  service.on("update_pg", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_pg", mailconfig[0], request.pgowner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("deactivate_pg", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_pg", mailconfig[0], request.pgowner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_pg_room", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_pg_room", mailconfig[0], request.pgowner.email, "", "", request)
        }
      })
    }
  })
  service.on("update_pg_room", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_pg_room", mailconfig[0], request.pgowner.email, "", "", request)
        }
      })
    }
  })
  service.on("deactivate_pg_room", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_pg_room", mailconfig[0], request.pgowner.email, "", "", request)
        }
      })
    }
  })

  service.on("add_food_menu", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_food_menu", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("update_food_menu", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_food_menu", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("deactivate_food_menu", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_food_menu", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_pgstaff", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_pg_staff", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("update_pgstaff", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_pg_staff", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("deactivate_pgstaff", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_pg_staff", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_tenant", (request) => {
    console.log("============= Start add tenant ============")
    console.log(request)
    console.log("============= Start add tenant ============")
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        console.log(mailconfig)
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          //app, name, mailconfig, to, cc, bcc, data
          send_mail(app, "add_tenant", mailconfig[0], request.tenant.email, request.pgowner.email, "", request)
        }
      })
    }
  })
  service.on("update_tenant", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_tenant", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("deactivate_tenant", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_tenant", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_admin", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_admin", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("update_admin", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_admin", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })
  service.on("deactivate_admin", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_admin", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("add_user", (request) => {
    console.log("============ Mail Service Add User ==========")
    console.log(request)
    console.log("============ Mail Service Add User ==========")
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "add_user", mailconfig[0], request.email, "", "", request)
        }
      })
    }
  })
  service.on("update_user", (request) => {
    console.log(" ================== Mail Service Update User ========= ")
    console.log(request)
    console.log(" ================== Mail Service Update User ========= ")
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "update_user", mailconfig[0], request.email, "", "", request)
        }
      })
    }
  })
  service.on("deactivate_user", (request) => {
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "deactivate_admin", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("resendVerifySignup", (request) => {
    console.log("=========== Inside Password Change ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      console.log(mailconfig)
      if (!_.isUndefined(mailconfig) && !_.isUndefined(mailconfig[0])) {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          console.log(mailconfig[0])
          send_mail(app, "resendVerifySignup", mailconfig[0], request.email, "", "", request)
        }
      } else {
        console.log(" Inside resendVerifySignup")
      }
    })
  })

  service.on("verifySignup", (request) => {
    console.log("=========== Inside Password Change ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
        send_mail(app, "verifySignup", mailconfig[0], request.owner.email, request.tenant.email, "", request)
      }
    })
  })
  service.on("sendResetPwd", (request) => {
    console.log("=========== Inside Send Reset Password ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
        send_mail(app, "sendResetPwd", mailconfig[0], request.owner.email, request.tenant.email, "", request)
      }
    })
  })
  service.on("resetPwd", (request) => {
    console.log("=========== Inside Password Change ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
        send_mail(app, "resetPwd", mailconfig[0], request.owner.email, request.tenant.email, "", request)
      }
    })
  })
  service.on("passwordChange", (request) => {
    console.log("=========== Inside Password Change ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
        send_mail(app, "passwordChange", mailconfig[0], request.owner.email, request.tenant.email, "", request)
      }
    })
  })
  service.on("identityChange", (request) => {
    console.log("=========== Inside Password Change ===============")
    console.log(request)
    app.service('/api/mail').find({
      query: {
        name: "info",
        isEnabled: true
      }
    }).then(mailconfig => {
      if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
        send_mail(app, "identityChange", mailconfig[0], request.owner.email, request.tenant.email, "", request)
      }
    })
  })


  service.on("service_request_raised", (request) => {
    console.log("====================== service_request_raised =================")
    console.log(request)
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "service_request_raised", mailconfig[0], request.owner.email, request.tenant.email, "", request)
        }
      })
    }
  })

  service.on("service_request_updated", (request) => {
    console.log("====================== service_request_raised =================")
    console.log(request)
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail(app, "service_request_updated", mailconfig[0], request.tenant.email, request.owner.email, "", request)
        }
      })
    }
  })

  service.on("send_mail", (request) => {
    console.log("==================== Send Mail ====================1")
    console.log(request)
    if (!_.isEmpty(request)) {
      service.find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          send_mail_1(app, mailconfig[0], request.data.to, request.data.cc, request.data.bcc, request.data.subject, request.data.body)
        }
      })
    }
  })
};

function send_mail_1(app, mailconfig, to, cc, bcc, subject, data) {

  app.service("/api/mailtemplates").find({
    query: {
      name: "welcome",
      isEnabled: true,
    }
  }).then(mail_template => {
    if (!_.isUndefined(mail_template) && !_.isUndefined(mail_template[0])) {
      if (!(_.isEmpty(mail_template[0]) && mail_template[0].isEnabled)) {
        app.use('/mailer', Mailer(smtpTransport({
          host: mailconfig.host,
          port: mailconfig.port,
          secure: mailconfig.secure,
          auth: {
            user: mailconfig.auth.user,
            pass: mailconfig.auth.pass
          }
        })));
        let mailOptions = {
          from: mail_template[0].from,
          to: to,
          cc: cc,
          bcc: bcc,
          subject: subject,
          html: data
        };

        app.service('mailer').create(mailOptions).then(function (result) {
          console.log(result);
        }).catch(err => {
          console.log(err);
        });
      }
    }

  })
}

function send_mail(app, name, mailconfig, to, cc, bcc, data) {

  app.service("/api/mailtemplates").find({
    query: {
      name: name,
      isEnabled: true,
    }
  }).then(mail_template => {
    if (!_.isUndefined(mail_template) && !_.isUndefined(mail_template[0])) {
      if (!(_.isEmpty(mail_template[0]) && mail_template[0].isEnabled)) {
        app.use('/mailer', Mailer(smtpTransport({
          host: mailconfig.host,
          port: mailconfig.port,
          secure: mailconfig.secure,
          auth: {
            user: mailconfig.auth.user,
            pass: mailconfig.auth.pass
          }
        })));
        let mailOptions = {
          from: mail_template[0].from,
          to: to,
          cc: mail_template[0].cc + "," + cc,
          bcc: mail_template[0].bcc + "," + bcc,
          subject: mail_template[0].subject,
          html: Handlebars.compile(mail_template[0].template)({data: data})
        };

        app.service('mailer').create(mailOptions).then(function (result) {
          console.log(result);
        }).catch(err => {
          console.log(err);
        });
      }
    }

  })
}
