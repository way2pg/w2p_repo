var path = require('path');

var countries = require(path.resolve('config/countries.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/countries').remove(null).then(response => {
      return res.send({"Success": _.size(response) + " Countries are deleted."});
    })
  };
};

