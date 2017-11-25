const _ = require("lodash")
module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/smstemplates').remove(null).then(response => {
      return res.send({"Success": _.size(response) + " SMS Templates are deleted."});
    })
  };
};

