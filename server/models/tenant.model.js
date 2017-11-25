module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const tenant = new mongoose.Schema({
    pgdetails: {
      type: Schema.Types.ObjectId,
      ref: 'pgdetails'
    },
    tenantImg: {
      type: String,
      required: false
    },
    referredBy: {
      type: String,
      required: false
    },
    referralCode: {
      type: String,
      required: false
    },
    idproofs: [],
    joinedPackage: {
      type: String,
      required: false
    },
    advanceAmount: {
      type: String,
      required: false
    },
    paidAmount: {
      type: String,
      required: false
    },
    joinedDate: {
      type: String,
      required: false
    },
    uploadedImages: [
      {}
    ],
    roomtype: {
      type: String,
      required: false
    },
    pgowner: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    deleted: {
      type: Boolean,
      reqired: false,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    deletedAt:{
      type:Date,
    }
  });

  return mongoose.model('tenant', tenant);
};
