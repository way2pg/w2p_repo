// Initializes the `cities` service on path `/api/cities`
const createService = require('feathers-mongoose');
const createModel = require('../../models/cities.model');
const hooks = require('./cities.hooks');
const filters = require('./cities.filters');
var path = require('path');
var states = require(path.resolve('config/s.json'))
var cities = require(path.resolve('config/ci.json'))
var jsonfile = require('jsonfile')
const _ = require("lodash")

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'cities',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/cities', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/cities');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
  
  
  /*service.on("parse_data", (object) => {
	   console.log("Inside of this")
	  var file = './data.json'
       let sample =[]		  
		_.each(states, function (state) {
        _.each(cities, function (city) {
          if (_.isEqual(city.state, state._id)) {
            delete city._id;
            delete city.isDeleted;
            delete city.updatedAt;
            delete city.createdAt;
            delete city.__v;
            city.state = state.name;
            sample.push(city)
          }
        })
      }) 

	jsonfile.writeFile(file, sample, function (err) {
		console.error(err)
	})
	  
  });*/
 
};
