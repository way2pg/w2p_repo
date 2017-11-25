module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const foodreport = new mongoose.Schema({

    pgowner:{type: Schema.Types.ObjectId, ref: 'users'},
    date: { type: Date},
    breakfast: { type: Number},
    lunch: { type: Number},
    dinner: { type: Number},

    createdBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    createdAt: {type: Date, default: Date.now},

    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

    isDeleted:{type:Boolean, default:false},
    deletedAt: {type: Date},
    deletedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

  });

  return mongoose.model('foodreport', foodreport);
};
