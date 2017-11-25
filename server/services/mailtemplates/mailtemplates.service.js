// Initializes the `mailtemplates` service on path `/api/mailtemplates`
const createService = require('feathers-mongoose');
const createModel = require('../../models/mailtemplates.model');
const hooks = require('./mailtemplates.hooks');
const filters = require('./mailtemplates.filters');
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
    name: 'mailtemplates',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/mailtemplates', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/mailtemplates');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("test_mail_template", (object) => {
    console.log(" ============================ 2 ")
    console.log(object)
    if (!_.isEmpty(object)) {
      app.service('api/mail').find({
        query:{
          name: "info"
        }
      }).then(mailconfig => {
        console.log(mailconfig)
        if (!_.isEmpty(mailconfig[0])) {
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
            from: object.from,
            to: object.user.email,
            cc: object.cc,
            bcc: object.bcc,
            subject: object.subject,
            html: Handlebars.compile(object.template)({user: object.user})
          };
          app.service('mailer').create(mailOptions).then(function (result) {
            console.log(result);
          }).catch(err => {
            console.log(err);
          });
        }
      })
    }
  })
};
