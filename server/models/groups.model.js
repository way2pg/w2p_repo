module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const groups = new mongoose.Schema({
    name: {
      type: String,
      required: false
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: 'users'
    }],
    is_staff_group: {
      type: Boolean,
      default: false
    },
    is_tenant_group: {
      type: Boolean,
      default: false
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
    deletedAt: {
      type: Date,
    }
  });

  return mongoose.model('groups', groups);
};
