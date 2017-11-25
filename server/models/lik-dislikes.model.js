module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const likDislikes = new mongoose.Schema({

    pgid: {
      type: Schema.Types.ObjectId,
      ref: 'pgdetails'
    },
    userid: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    like: {
      type: Boolean
    },
    dislike: {
      type: Boolean
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

  return mongoose.model('likDislikes', likDislikes);
};
