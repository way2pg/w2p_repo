// Initializes the `reports` service on path `/api/reports`
const createService = require('feathers-mongoose');
const createModel = require('../../models/food-report.model');
const hooks = require('./food-report.hooks');
const filters = require('./food-report.filters');
const _ = require('lodash')
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'reports',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/foodreport', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/foodreport');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("update_food_report", object => {
    app.service("/api/foodrequest").find({}).then(response => {
      if (!_.isEmpty(response)) {
        let data = {}
        _.forEach(response, function (foodrequest) {
          console.log(foodrequest)
          const range = moment.range(moment(foodrequest.start_date, "DD-MM-YYYY"), moment(foodrequest.end_date, "DD-MM-YYYY"));
          const days = Array.from(range.by('day'));
          days.map(m => {
            console.log(m.format('DD-MM-YYYY'))
          })
          console.log("=========================")
          days.map(m => {
            if (_.hasIn(data, foodrequest.pgowner)) {
              if (_.hasIn(data[foodrequest.pgowner], m.format('DD-MM-YYYY'))) {
                if (foodrequest.breakfast) {
                  data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["breakfast"] = data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["breakfast"] + 1;
                }
                if (foodrequest.lunch) {
                  data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["lunch"] = data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["lunch"] + 1;
                }
                if (foodrequest.dinner) {
                  data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["dinner"] = data[foodrequest.pgowner][m.format('DD-MM-YYYY')]["dinner"] + 1;
                }
              } else {
                data[foodrequest.pgowner][m.format('DD-MM-YYYY')] = {}
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {pgowner: foodrequest.pgowner})
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {date: m})
                if (foodrequest.breakfast) {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {breakfast: 1})
                } else {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {breakfast: 0})
                }
                if (foodrequest.lunch) {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {lunch: 1})
                } else {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {lunch: 0})
                }
                if (foodrequest.dinner) {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {dinner: 1})
                } else {
                  _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {dinner: 0})
                }
              }
            } else {
              data[foodrequest.pgowner] = {}
              data[foodrequest.pgowner][m.format('DD-MM-YYYY')] = {}
              _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {pgowner: foodrequest.pgowner})
              _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {date: m})
              if (foodrequest.breakfast) {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {breakfast: 1})
              } else {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {breakfast: 0})
              }
              if (foodrequest.lunch) {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {lunch: 1})
              } else {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {lunch: 0})
              }
              if (foodrequest.dinner) {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {dinner: 1})
              } else {
                _.assign(data[foodrequest.pgowner][m.format('DD-MM-YYYY')], {dinner: 0})
              }
            }
          })
        });

        console.log(data)
        app.service("/api/foodreport").remove(null, {}).then(response => {
          _.forEach(data, function (foodreports) {
            _.forEach(foodreports, function (foodreport) {
              app.service("/api/foodreport").create(foodreport)
            })
            //app.service("/api/foodreport").create(value)
          });
        })

      }

    })
  })
};
