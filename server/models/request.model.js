const moment = require('moment')
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const request = new mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      comments: [
        {
          comment: String,
          owner: {
            type: Boolean,
            default: false
          },
          createdAt: {
            type: Date,
            default: new Date()
          }
        }
      ],
      request_number: {
        type: Number
      },
      request: {
        type: String,
      },
      type: {
        type: String,
        required: false,
        default: "Service"
      },
      status: {
        type: String,
        required: false,
        default: "Pending"
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      owner_comments: {
        type: String,
        required: false
      },
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
  return mongoose.model('request', request);
};
