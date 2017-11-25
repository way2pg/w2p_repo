module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const mail = new mongoose.Schema({
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true
    },
    app_name:{
      type:String,
    },
    isEnabled: {
      type: Boolean,
      default: true
    },
    host: {type: String},
    port: {type: String},
    secure: {type: String},
    auth: {
      user: {type: String},
      pass: {type: String}
    },

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

  return mongoose.model('mail', mail);
};
