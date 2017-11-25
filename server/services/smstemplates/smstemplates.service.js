// Initializes the `smstemplates` service on path `/api/smstemplates`
const createService = require('feathers-mongoose');
const createModel = require('../../models/smstemplates.model');
const hooks = require('./smstemplates.hooks');
const filters = require('./smstemplates.filters');
const request = require('request-promise');
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'smstemplates',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/smstemplates', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/smstemplates');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("test_sms_template", (object) => {
    console.log(object)
    if (!_.isEmpty(object)) {
      app.service("/api/sms").find({
        query: {
          isEnabled: true,
        }
      }).then(smsconfig => {
        console.log(smsconfig)
        if (!_.isEmpty(smsconfig[0])) {
          const makeRequest = request.defaults({
            baseUrl: smsconfig[0].url + "&username=" + smsconfig[0].username + "&password="
            + smsconfig[0].password
            + "&number=" + object.user.mobile
            + "&message=" + object.template,
            json: true
          });
          makeRequest("").then(response => {
            console.log(response)
          })
        }
      })
    }
  })

};
