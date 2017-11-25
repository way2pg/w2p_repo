module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const jobs = new mongoose.Schema({
    name:{type:String},
    time:{
      type:String
    },
    type:{
      type:String
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
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    deletedAt: {
      type: Date,
    }
  });

  return mongoose.model('tenant', tenant);
};

/*
*
* job
 =====
 url
 class
 wait_time
 width
 height

 * */
