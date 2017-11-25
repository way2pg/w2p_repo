module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const configuration = new mongoose.Schema({
    key: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    comments: {
      type: String,
      trim: true,
      required: false
    },
    createdAt: {
      type: Date,
      'default': Date.now
    },
    updatedAt: {
      type: Date,
      'default': Date.now
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
  });

  return mongoose.model('configuration', configuration);
};
