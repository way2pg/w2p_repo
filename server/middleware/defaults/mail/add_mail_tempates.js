var path = require('path');

var mailtemplates = require(path.resolve('config/mail_templates.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/mailtemplates').find({}).then(response => {
      if (_.isEmpty(response)) {
        app.service('/api/mailtemplates').create(mailtemplates).then(mail_template_list => {
          return res.send({
            "status": "Success",
            "total": _.size(mail_template_list),
            "Countries": mail_template_list
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

