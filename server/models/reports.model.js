module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const reports = new mongoose.Schema({

    admin_count: { type: Number},
    super_admin_count: { type: Number},
    user_count: { type: Number},
    pgowner_count: { type: Number},
    tenant_count: { type: Number},
    pgstaff_count: { type: Number},


    createdBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    createdAt: {type: Date, default: Date.now},

    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

    isDeleted:{type:Boolean, default:false},
    deletedAt: {type: Date},
    deletedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

  });

  return mongoose.model('reports', reports);
};
