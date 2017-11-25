// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/agenda.model');
const hooks = require('./agenda.hooks');
const filters = require('./agenda.filters');
const request = require('request-promise');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const Mailer = require('feathers-mailer');
const Handlebars = require('handlebars');
const _ = require('lodash');
const path = require("path")
const Nightmare = require("nightmare")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'agenda',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/agenda', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/agenda');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("admins_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/admins/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.admins');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/admins.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "admins.png", data, "admins_report")
        });
      });
  })
  service.on("users_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/users/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.users');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/users.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "users.png", data, "users_report")
        });
      });
  })
  service.on("pgowners_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/pgowners/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.pgowners');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/users.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "pgowners.png", data, "pgowners_report")
        });
      });
  })
  service.on("tenants_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/tenants/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.tenants');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/tenants.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "tenants.png", data, "tenants_report")
        });
      });
  })
  service.on("superadmins_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/superadmins/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.superadmins');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/superadmins.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "superadmins.png", data, "superadmins_report")
        });
      });
  })
  service.on("pgstaff_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/pgstaff/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.pgstaff');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/pgstaffs.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "pgstaffs.png", data, "pgstaff_report")
        });
      });
  })
  service.on("dashboard_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/dashboard/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('body');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/dashboard.png')
      })
      .then(function () {
        nightmare.end(function () {
          send_mail(app, "dashboard.png", data, "dashboard_report")
        });
      });
  })
  service.on("expenses_report", data => {
    const nightmare = Nightmare({
      show: false,
      maxHeight: 5000,
      width: 1920,
      height: 1080,
      frame: false,
      useContentSize: true
    });


    nightmare.goto(app.get("client") + 'reports/expenses/' + data.id)
      .wait(3000)
      .evaluate(function () {
        var s = document.styleSheets[0];
        s.insertRule('::-webkit-scrollbar { display:none; }');
        var body = document.querySelector('.expenses');
        return {
          height: body.scrollHeight,
          width: body.scrollWidth
        }
      })
      .then(function (dimensions) {
        return nightmare
          .viewport(dimensions.width + 200, dimensions.height + 200)
          .wait(1000)
          .screenshot('./reports/expenses.png')
      })
      .then(function () {
        nightmare.end(function () {
          console.log('done ============ ');
          send_mail(app, "expenses.png", data, "expenses_report")
        });
      });
  })


  service.on("created", data => {
    console.log(data)
    app.get("agenda").define(data.name, function (job, done) {
      service.emit(data.name, job.attrs.data);
      done();
    });


    var job = app.get("agenda").create(data.name, {id: data.user, name: data.name});
    job.repeatEvery(data.interval);
    job.unique({
      'data.id': data.user,
      'data.name': data.name
    });
    job.save();
  })


};

function send_mail(app, image_name, data, name) {
  app.service("/api/users").get(data.id).then(user => {
    if (!_.isEmpty(user)) {
      app.service("/api/mail").find({
        query: {
          name: "info",
          isEnabled: true
        }
      }).then(mailconfig => {
        if (!(_.isEmpty(mailconfig[0]) && mailconfig[0].isEnabled)) {
          app.service("/api/mailtemplates").find({
            query: {
              name: name,
              isEnabled: true,
            }
          }).then(mail_template => {
            if (!_.isUndefined(mail_template) && !_.isUndefined(mail_template[0])) {
              if (!(_.isEmpty(mail_template[0]) && mail_template[0].isEnabled)) {
                app.use('/mailer', Mailer(smtpTransport({
                  host: mailconfig[0].host,
                  port: mailconfig[0].port,
                  secure: mailconfig[0].secure,
                  auth: {
                    user: mailconfig[0].auth.user,
                    pass: mailconfig[0].auth.pass
                  }
                })));
                let mailOptions = {
                  from: mail_template[0].from,
                  to: user.email,
                  cc: mail_template[0].cc,
                  bcc: mail_template[0].bcc,
                  subject: mail_template[0].subject,
                  html: Handlebars.compile(mail_template[0].template)({data: user}),
                  attachments: [{
                    filename: image_name,
                    path: path.resolve("./reports/" + image_name),
                    cid: user.email //same cid value as in the html img src
                  }]
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
      })
    }
  })

}
