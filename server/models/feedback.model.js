module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const feedback = new mongoose.Schema({
    to: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    ratings: {
      type: Object,
      required: false
    },
    comments: {
      type: String,
      required: false
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

  });

  return mongoose.model('feedback', feedback);
};
