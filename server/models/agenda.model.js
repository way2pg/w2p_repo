module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const agenda = new mongoose.Schema({
    name: {type: String},
    interval: {type: String},
    priority: {type: Number},
    timezone: {type: String},
    service_url: {type: String},
    repeat_every: {type: Boolean},
    data: {

    },
    user:{
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    deletedAt: {
      type: Date,
    }
  });

  return mongoose.model('agenda', agenda);
};
