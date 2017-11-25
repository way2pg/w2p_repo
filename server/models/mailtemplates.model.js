module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const mailtemplates = new mongoose.Schema({
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true
    },
    from: {type: String, required: true},
    bcc: {type: String, default: ""},
    cc: {type: String, default: ""},
    subject: {type: String, required: true},
    template: {type: String, required: true},
    isEnabled: {type: Boolean, default: true},
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    deletedAt: {
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
    isDeleted: {
      type: Boolean
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },

  });

  return mongoose.model('mailtemplates', mailtemplates);
};
