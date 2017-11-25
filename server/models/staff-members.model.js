// staff-members-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const staffMembers = new mongoose.Schema( {
    pgowner: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    pgdetails:{
      type: Schema.Types.ObjectId,
      ref: 'pgdetails'
    },
    staffmember: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    staffrole: {
      type: String,
      required: false
    },
    permissions: {
      type: Object,
      default: {},
      required: false
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    deleteAt:{
      type:Date
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    deleted: {
      type: Boolean,
      reqired: false,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  });

  return mongoose.model('staffMembers', staffMembers);
};
