module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const comments = new mongoose.Schema({

    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    pgid: {
      type: Schema.Types.ObjectId,
      ref: 'pgdetails'
    },
    comment: {
      type: String
    },
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
    }
  });

  return mongoose.model('comments', comments);
};
