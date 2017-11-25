// countries-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const countries = new Schema({
    code: {type: String},
    name: {type: String},
    dial_code: {type: String},
    currency_name: {type: String},
    currency_symbol: {type: String},
    currency_code: {type: String},

    createdBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    createdAt: {type: Date, default: Date.now},

    updatedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    updatedAt: {type: Date, default: Date.now},

    deletedBy: {type: Schema.Types.ObjectId, ref: 'users', select: false},
    deletedAt: {type: Date},
    isDeleted: {type: Boolean, default: false}
  });

  return mongooseClient.model('countries', countries);
};
