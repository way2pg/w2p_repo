var path = require('path');

var sms_config = require(path.resolve('config/sms_config.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/sms').find({}).then(response => {
      if (_.isEmpty(response)) {
        app.service('/api/sms').create(sms_config).then(sms_config_list => {
          return res.send({
            "status": "Success",
            "total": _.size(sms_config_list),
            "Countries": sms_config_list
          });
        })
      } else {
        return res.send({
          "status": "Success",
          "total": _.size(response),
          "Countries": response
        });
      }
    })
  };
};

