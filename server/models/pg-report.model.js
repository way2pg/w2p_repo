module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const pgreport = new mongoose.Schema({

    pgowner:{type: Schema.Types.ObjectId, ref: 'users'},
    pg_id:{},
    pg_count:{},
    tenant_count:{},
    room_count:{},
    staff_count:{},
    deluxe:{},
    luxury:{},
    general:{},

    createdBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    createdAt: {type: Date, default: Date.now},

    updatedAt: {type: Date, default: Date.now},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

    isDeleted:{type:Boolean, default:false},
    deletedAt: {type: Date},
    deletedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},

  });

  return mongoose.model('pgreport', pgreport);
};

