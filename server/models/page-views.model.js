module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const pageViews = new mongoose.Schema( {
    pgid: {
      type: Schema.Types.ObjectId,
      ref: 'pgdetails',
      index: {unique: true}
    },
    view_count: {
      type: Number
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
    }
  });

  return mongoose.model('pageViews', pageViews);
};
