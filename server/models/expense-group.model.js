module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const expensegroup = new mongoose.Schema({

    expense_group: {
      type: String,
      trim: true,
      required: true
    },
    comments: {type: String},
    pgdetails: {
      type: Schema.Types.ObjectId,
      ref: 'pgdetails'
    },

    isFixed: {
      type: Boolean,
      default: false
    },
    rent: {type: Boolean, default: false},
    salary: {type: Boolean, default: false},
    createdAt: {
      type: Date
    },
    updatedAt: {
      type: Date
    },
    deletedAt: {
      type: Date
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

  return mongoose.model('expensegroup', expensegroup);
};
