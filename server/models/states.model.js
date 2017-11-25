// states-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const states = new Schema({
    /*_id: {type: Number},*/
    name: {type: String},
    country: {type: Schema.Types.ObjectId, ref: 'countries'},

    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    createdAt: {type: Date, default: Date.now},

    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedAt: {type: Date, default: Date.now},

    deletedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    deletedAt: {type: Date},
    isDeleted: {type: Boolean, default: false}
  });

  return mongooseClient.model('states', states);
};
