const mongoose = require('mongoose');
//const AutoIncrement = require('mongoose-sequence')(mongoose);
module.exports = function () {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
  //app.set('AutoIncrement', AutoIncrement)
};
