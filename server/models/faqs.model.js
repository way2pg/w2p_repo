module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const faqs = new mongoose.Schema({

    question: {
      type: String
    },
    answer: {
      type: String
    },
    like: {
      type: Number
    },
    dislike: {
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

  return mongoose.model('faqs', faqs);
};
