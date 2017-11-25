module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const users = new mongoose.Schema({
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
    },
    middleName: {
      type: String,
      required: false
    },
    displayName: {
      type: String,
      required: false
    },
    email: {
      type: String,
      lowercase: true, trim: true, required: true, unique: true
    },
    dob: {
      type: String,
      require: false
    },
    gender: {
      type: String,
      require: false
    },
    maritalStatus: {
      type: String,
      require: false
    },
    mobile: {
      type: String,
      lowercase: true, trim: true, required: true, unique: true
    },
    password: {
      type: String,
      required: true
    },
    addressLineOne: {
      type: String,
      required: false
    },
    addressLineTwo: {
      type: String,
      required: false
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'cities'
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'states'
    },
    postalCode: {
      type: Number,
      required: false
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'countries'
    },
    landMark: {
      type: String,
      required: false
    },
    comments: {
      type: String,
      required: false
    },
    profileImg: {type: String, default: "/assets/images/placeholder.jpg"},
    coverImg: {type: String, default: "/assets/images/cover_img.jpg"},
    facebook: {
      id: String,
      token: String
    },
    role: {
      type: String,
      reqired: false,
      default: "user"
    },
    passwordtoken: {
      type: String,
      required: false
    },
    passwordexpires: {
      type: Number,
      required: false
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
      reqired: false,
      default: false
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    deletedAt: {
      type: Date,
    },

    isVerified: {type: Boolean},
    verifyToken: {type: String},
    verifyShortToken: {type: String},
    verifyExpires: {type: Date}, // or a long integer
    verifyChanges: {type: Object},
    resetToken: {type: String},
    resetShortToken: {type: String},
    resetExpires: {type: Date},
  });

  return mongoose.model('users', users);
};
