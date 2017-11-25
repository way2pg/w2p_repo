const mongoose = require('mongoose');
const Agenda = require('agenda')
const _ = require("lodash")
module.exports = function () {
  const app = this;
  var agenda = new Agenda({db: {address: app.get('mongodb'), collection: 'scheduler'}});
  agenda.on('ready', ()=> {
    console.log("=============== Starting Agenda Scheduler =============")

    app.service("/api/scheduler").remove(null, {}).then(response => {
      app.service("/api/agenda").find({}).then(agenda_jobs => {
        _.forEach(agenda_jobs, function (data) {
          app.get("agenda").define(data.name, function (job, done) {
            app.service("/api/agenda").emit(data.name, job.attrs.data);
            done();
          });

          var job = app.get("agenda").create(data.name, {id: data.user,name:data.name});
          job.repeatEvery(data.interval);
          job.unique({
            'data.id': data.user,
            'data.name': data.name
          });
          job.save();
        });

      })

    })
    agenda.start();

    console.log("=============== Completed Agenda Scheduler =============")

    agenda.on('start', function (job) {
      console.log('Job %s starting', job.attrs.name);
    });

    agenda.on('complete', function (job) {
      console.log('Job %s finished', job.attrs.name);
    });
    agenda.on('success', function (job) {

    });
    agenda.on('fail', function (err, job) {

    });
  })

  app.set('agenda', agenda);
};
