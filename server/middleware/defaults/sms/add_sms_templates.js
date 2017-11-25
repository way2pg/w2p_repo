var path = require('path');

var smstemplates = require(path.resolve('config/sms_templates.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/smstemplates').find({}).then(response => {
      if (_.isEmpty(response)) {
        app.service('/api/smstemplates').create(smstemplates).then(smstemplates_list => {
          return res.send({
            "status": "Success",
            "total": _.size(smstemplates_list),
            "Countries": smstemplates_list
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

