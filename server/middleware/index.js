const upload = require('./upload');
const download = require('./download');
const deleteImage = require('./delete');
const search = require('./search');
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);
const add_countries = require("./defaults/countries/add_countries")
const delete_countries = require("./defaults/countries/delete_countries")
const add_states = require("./defaults/states/add_states")
const delete_states = require("./defaults/states/delete_states")
const add_cities = require("./defaults/cities/add_cities")
const delete_cities = require("./defaults/cities/delete_cities")

const add_mail_config = require("./defaults/mail/add_mail_config")
const delete_mail_config = require("./defaults/mail/delete_mail_config")
const add_mail_templates = require("./defaults/mail/add_mail_tempates")
const delete_mail_templates = require("./defaults/mail/delete_mail_tempates")

const add_sms_config = require("./defaults/sms/add_sms_config")
const delete_sms_config = require("./defaults/sms/delete_sms_config")
const add_sms_templates = require("./defaults/sms/add_sms_templates")
const delete_sms_templates = require("./defaults/sms/delete_sms_templates")

const _ = require("lodash")
const elasticlunr = require("elasticlunr")


module.exports = function () {
  const app = this;

  app.use('/api/image/upload', upload(app));

  app.use('/api/image/download/:id', download(app));

  app.use('/api/image/delete/:id', deleteImage(app));

  app.use('/defaults/countries/add', add_countries(app));
  app.use('/defaults/countries/delete', delete_countries(app));

  app.use('/defaults/states/add', add_states(app));
  app.use('/defaults/states/delete', delete_states(app));

  app.use('/defaults/cities/add', add_cities(app));
  app.use('/defaults/cities/delete', delete_cities(app));

  app.use('/mail/config/add', add_mail_config(app))
  app.use('/mail/config/delete', delete_mail_config(app))
  app.use('/mail/templates/add', add_mail_templates(app))
  app.use('/mail/templates/delete', delete_mail_templates(app))

  app.use('/sms/config/add', add_sms_config(app))
  app.use('/sms/config/delete', delete_sms_config(app))
  app.use('/sms/templates/add', add_sms_templates(app))
  app.use('/sms/templates/delete', delete_sms_templates(app))
  
  app.use('/test', async function (req, res) {

  });
};
