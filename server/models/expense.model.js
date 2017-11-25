// expense-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const expense = new mongoose.Schema({


    date: {
      type: Date,
    },
    expense_group: {
      type: Schema.Types.ObjectId,
      ref: 'expensegroup'
    },
    expense_item: {
      type: Schema.Types.ObjectId,
      ref: 'expenseitem'
    },
    amount: {
      type: Number,
    },
    comments: {type: String},

    rent: {type: Boolean, default: false},
    salary: {type: Boolean, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    first_rent: {type: Boolean, default: false},

    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    },
    deletedAt: {
      type: Date
    },
    pgowner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    isDeleted: {
      type: Boolean
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
  });

  return mongoose.model('expense', expense);
};
