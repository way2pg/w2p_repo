// Initializes the `reports` service on path `/api/reports`
const createService = require('feathers-mongoose');
const createModel = require('../../models/pg-report.model');
const hooks = require('./pg-report.hooks');
const filters = require('./pg-report.filters');
const _ = require('lodash')
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'pgreport',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/api/pgreport', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/pgreport');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }

  service.on("update_pg_report", object => {
    app.service("/api/pgdetails").find({}).then(response => {
      let data = {}
      _.forEach(response, function (pgdetails) {
        data[pgdetails._id] = {}
        _.assign(data[pgdetails._id], {pgowner: pgdetails.pgowner})
        _.assign(data[pgdetails._id], {pg_count: 1})
        _.assign(data[pgdetails._id], {tenant_count: pgdetails.tenants.length})
        _.assign(data[pgdetails._id], {staff_count: pgdetails.staffmembers.length})
        _.assign(data[pgdetails._id], {pg: pgdetails._id})
        data[pgdetails._id]["deluxe"] = {}
        data[pgdetails._id]["deluxe"]["single"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["deluxe"]["double"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["deluxe"]["triple"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["deluxe"]["four"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["luxury"] = {}
        data[pgdetails._id]["luxury"]["single"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["luxury"]["double"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["luxury"]["triple"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["luxury"]["four"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["general"] = {}
        data[pgdetails._id]["general"]["single"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["general"]["double"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["general"]["triple"] = {"total": 0, "vacancies": 0}
        data[pgdetails._id]["general"]["four"] = {"total": 0, "vacancies": 0}

        _.forEach(pgdetails.rooms, function (room) {
          if (room.single) {
            data[pgdetails._id][_.toLower(room.roomType)]["single"]["total"] = data[pgdetails._id][_.toLower(room.roomType)]["single"]["total"] + room.sAvailableRooms;
            data[pgdetails._id][_.toLower(room.roomType)]["single"]["vacancies"] = data[pgdetails._id][_.toLower(room.roomType)]["single"]["vacancies"] + room.sAvailableVacancies;
          }
          if (room.double) {
            data[pgdetails._id][_.toLower(room.roomType)]["double"]["total"] = data[pgdetails._id][_.toLower(room.roomType)]["double"]["total"] + room.dAvailableRooms;
            data[pgdetails._id][_.toLower(room.roomType)]["double"]["vacancies"] = data[pgdetails._id][_.toLower(room.roomType)]["double"]["vacancies"] + room.dAvailableVacancies;
          }
          if (room.triple) {
            data[pgdetails._id][_.toLower(room.roomType)]["triple"]["total"] = data[pgdetails._id][_.toLower(room.roomType)]["triple"]["total"] + room.tAvailableRooms;
            data[pgdetails._id][_.toLower(room.roomType)]["triple"]["vacancies"] = data[pgdetails._id][_.toLower(room.roomType)]["triple"]["vacancies"] + room.tAvailableVacancies;
          }
          if (room.four) {
            data[pgdetails._id][_.toLower(room.roomType)]["four"]["total"] = data[pgdetails._id][_.toLower(room.roomType)]["four"]["total"] + room.fAvailableRooms;
            data[pgdetails._id][_.toLower(room.roomType)]["four"]["vacancies"] = data[pgdetails._id][_.toLower(room.roomType)]["four"]["vacancies"] + room.fAvailableVacancies;
          }
        })
      })
      app.service("/api/pgreport").remove(null, {}).then(response => {
        _.forEach(data, function (pgreport) {
          app.service("/api/pgreport").create(pgreport);
        })
      })
    })
  })
};
