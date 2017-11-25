module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const rules = new mongoose.Schema( {
    rule: {
      type: String,
      required: false
    },
    createdAt: {type: Date, 'default': Date.now},
    updatedAt: {type: Date, 'default': Date.now},
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  });

  return mongoose.model('rules', rules);
};
