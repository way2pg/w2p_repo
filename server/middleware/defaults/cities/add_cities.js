var path = require('path');

var cities = require(path.resolve('config/cities.json'))
const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {	
    app.service('/api/states').find({}).then(states => {
      if (!_.isEmpty(states)) {
        let _cities = [];
        _.each(states, function (state) {
          _.each(cities, function (city) {
            if (_.isEqual(state.name, city.state)) {
              city.state = state;
              _cities.push(city)
            }
          })
        });
        app.service("/api/cities").create(_cities).then($cities => {
          return res.send(
            {
              "status": "Success",
              "total": _.size($cities),
              "states": $cities
            }
          )
        })
      }
    });
	
  };
};

