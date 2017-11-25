/*
module.exports = function (options = {}) {
  return function deleteImage(req, res, next) {
    console.log('delete middleware is running');
    next();
  };
};
*/

var Grid = require('gridfs-stream');
module.exports = function (app) {
  console.log("Inside Delete Function")
  return function deleteImage(req, res, next) {
    const mongoose = app.get('mongooseClient');
    Grid.mongo = mongoose.mongo;
    let gfs = Grid(mongoose.connection.db);
    var options = {_id: gfs.tryParseObjectId(req.params.id), root: "images"}; //can be done via _id as well
    gfs.exist(options, function (err, found) {
      if (found) {
        gfs.remove(options, function (err) {
          if (err) {
            return res.send({"error": "File Not Found"});
          }
          return res.send({"Success": "File Deleted"});
        });
      }
    });
    //next();
  };
};
