// test-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const events = new mongoose.Schema({
    name: {type: String},
    url: {
      type: String
    },
    action: {type: String},
    message: {type: String},
    data: {},
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    deleted: {
      type: Boolean,
      reqired: false,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    deletedAt: {
      type: Date,
    },
  });

  return mongoose.model('events', events);
};
