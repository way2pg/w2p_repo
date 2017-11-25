var path = require('path');

var countries = require(path.resolve('config/countries.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/countries').find({}).then(response => {
      if (_.isEmpty(response)) {
        app.service('/api/countries').create(countries).then(countryList => {
          return res.send({
            "status":"Success",
            "total": _.size(countryList),
            "Countries": countryList
          });
        })
      } else {
        return res.send({
          "status":"Success",
          "total": _.size(response),
          "Countries": response
        });
      }
    })
  };
};

