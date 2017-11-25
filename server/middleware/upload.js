var Grid = require('gridfs-stream');
module.exports = function (app) {
  return function upload(req, res, next) {
    console.log("Inside uploade ============> ")
    const mongoose = app.get('mongooseClient');
    Grid.mongo = mongoose.mongo;
    let gfs = Grid(mongoose.connection.db);

    try {

      if (req.hasOwnProperty('files')) {
        let part = req['files'].file_data;
        let writeStream = gfs.createWriteStream({
          filename: part.name,
          mode: 'w',
          root: 'images',
          content_type: part.mimetype
          /* metadata: {
           uploadedBy: {
           "$ref": "users",
           "$db": "pghub"
           }
           }*/
        });

        writeStream.on('close', function (file) {
          console.log("Inside close");
          let response = {};
          response["fileid"] = file._id;
          let initialPreviewConfig = {};
          initialPreviewConfig["caption"] = file.name;
          initialPreviewConfig["width"] = "60px";
          initialPreviewConfig["size"] = file.length;
          initialPreviewConfig["key"] = file._id;
          response["initialPreviewConfig"] = [initialPreviewConfig];
          return res.send(response);
        });

        writeStream.write(part.data);
        writeStream.end();
      }
    }
    catch (e) {
      console.log(e);
      res.send({"error": "error in your request"});

    }
    /*next();*/
  };
};


