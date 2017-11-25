const moment = require('moment')
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const support = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      mobile: {
        type: String,
      },
      location: {
        type: String,
      },

      support_number: {
        type: Number
      },
      comments: {
        type: String,
      },
      status: {
        type: String,
        required: false,
        default: "Pending"
      },

      admins: [],
      superadmins: [],

      createdAt: {type: Date, 'default': Date.now},
      updatedAt: {type: Date, 'default': Date.now},
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
    });
  return mongoose.model('support', support);
};
