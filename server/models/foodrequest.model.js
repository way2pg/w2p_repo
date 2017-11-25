// foodrequest-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const foodrequest = new mongoose.Schema({
    tenant: {type: Schema.Types.ObjectId, ref: 'user'},
    comments: {type: String, trim: true, required: false},
    start_date: {type: Date},
    end_date: {type: Date},
    dinner: {type:Boolean, default:false},
    lunch: {type:Boolean, default:false},
    breakfast: {type:Boolean, default:false},
    status: {type: String, required: false},
    pgowner: {type: Schema.Types.ObjectId, ref: 'user'},

    createdAt: {type: Date, 'default': Date.now},
    updatedAt: {type: Date, 'default': Date.now},
    deletedAt: {type: Date},
    isDeleted: {type: Boolean,},
    createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
    updatedBy: {type: Schema.Types.ObjectId, ref: 'user'},
    deletedBy: {type: Schema.Types.ObjectId, ref: 'user'}
  });

  return mongoose.model('foodrequest', foodrequest);
};
