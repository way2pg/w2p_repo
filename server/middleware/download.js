/*module.exports = function (options = {}) {
  return function download(req, res, next) {
    console.log('download middleware is running');
    next();
  };
};*/

var Grid = require('gridfs-stream');
module.exports = function (app) {
  return function getImage(req, res, next) {
    const mongoose = app.get('mongooseClient');
    Grid.mongo = mongoose.mongo;
    let gfs = Grid(mongoose.connection.db);


    gfs.findOne({_id: gfs.tryParseObjectId(req.params.id), root: 'images'}, function (err, file) {
      if (err) {
        return res.status(400).send(err);
      }
      else if (!file) {
        return res.status(404).send('Error on the database looking for the file.');
      }

      res.set('Content-Type', file.contentType);
      //res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

      try {
        var readstream = gfs.createReadStream({_id: gfs.tryParseObjectId(req.params.id), root: "images"});
        readstream.on("error", function (err) {
          res.end();
        });

        readstream.pipe(res);
      }
      catch (e) {
        app.error("Error Catch block - " + e);
        res.send({"error": "error in your request"});
      }
    });
  };
};

