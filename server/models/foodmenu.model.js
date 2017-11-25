// foodmenu-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const foodmenu = new mongoose.Schema({
    week: {
      type: Number,
      required: false
    },
    year: {
      type: Number,
      required: false
    },
    pgowner: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    foodMenu:{
      type:Object,
      required:false
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
      ref: 'users'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    isDeleted: {
      type: Boolean
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },


  });

  return mongoose.model('foodmenu', foodmenu);
};
