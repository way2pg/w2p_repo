const _ = require("lodash")
module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/mail').remove(null).then(response => {
      return res.send({"Success": _.size(response) + " Mail Configs are deleted."});
    })
  };
};

