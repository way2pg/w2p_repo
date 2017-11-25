// cities-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const cities = new Schema({
    /*_id: {type: Number},*/
    name: {type: String},
    state: {type: Schema.Types.ObjectId, ref: 'states'},

    createdBy: {type: Schema.Types.ObjectId, ref: 'users'},
    createdAt: {type: Date, default: Date.now},

    updatedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    updatedAt: {type: Date, default: Date.now},

    deletedBy: {type: Schema.Types.ObjectId, ref: 'users'},
    deletedAt: {type: Date},
    isDeleted: {type: Boolean, default: false}
  });

  return mongooseClient.model('cities', cities);
};
