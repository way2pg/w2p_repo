module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const expenseitem = new mongoose.Schema({

    expense_group: {
      type: Schema.Types.ObjectId,
      ref: 'expensegroup'
    },
    expense_item: {type: String},
    operation: {type: String},
    comments: {type: String},
    createdAt: {
      type: Date
    },
    isFixed:{
      type:Boolean,
      default:false
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

  return mongoose.model('expenseitem', expenseitem);
};
