module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const sms = new mongoose.Schema({
    isEnabled: {
      type: Boolean,
      default:true
    },
    url:{type:String},
    username:{type:String},
    password:{type:String},

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

  return mongoose.model('sms', sms);
};
