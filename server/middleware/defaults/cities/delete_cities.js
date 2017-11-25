const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/cities').remove(null).then(cities => {
      return res.send({
         "status":"Success",
         "message": _.size(cities) + " cities are deleted."
      });
    })
  };
};

