var path = require('path');

var mail_config = require(path.resolve('config/mail_config.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    console.log("=============== Mail Config ===============")
    app.service('/api/mail').find({}).then(response => {
      if (_.isEmpty(response)) {
        app.service('/api/mail').create(mail_config).then(mail_config_list => {
          return res.send({
            "status": "Success",
            "total": _.size(mail_config_list),
            "Countries": mail_config_list
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

