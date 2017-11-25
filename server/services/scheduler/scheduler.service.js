// Initializes the `sms` service on path `/api/sms`
const createService = require('feathers-mongoose');
const createModel = require('../../models/scheduler.model');
const hooks = require('./scheduler.hooks');
const filters = require('./scheduler.filters');
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
    name: 'scheduler',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/scheduler', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/scheduler');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }



};
