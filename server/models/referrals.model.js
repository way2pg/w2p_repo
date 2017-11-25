module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const referrals = new mongoose.Schema(
   {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    mobile: {
      type: String,
    },
    referral_code: {
      type: String,
    },
    status: {
      type: String,
      default:"Not Joined"
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      select: false
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      select: false
    },

  });

  return mongoose.model('referrals', referrals);
};
