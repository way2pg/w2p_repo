module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const scheduler = new mongoose.Schema({
    data: {},
    name:{type: String},
    type: {type: String},
    priority: {type: Number},
    nextRunAt: {},
    repeatInterval: {type: String},
    repeatTimezone: {},
    lastModifiedBy: {},
    lockedAt: {},
    lastRunAt: {}
  });

  return mongoose.model('scheduler', scheduler);
};
