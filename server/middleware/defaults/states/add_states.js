var path = require('path');

var states = require(path.resolve('config/states.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/countries').find({}).then(countries => {
      if (!_.isEmpty(countries)) {
        let _states = [];
        _.each(countries, function (country) {
          _.each(states, function (state) {
            if (_.isEqual(country.name, state.country)) {
              state.country = country;
              _states.push(state)
            }
          })
        });
        app.service("/api/states").create(_states).then($states => {
          return res.send(
            {
              "status": "Success",
              "total": _.size($states),
              "states": $states
            }
          )
        })
      }
    });
  };
};

