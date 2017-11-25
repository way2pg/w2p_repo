const _ = require("lodash")

module.exports = function (app) {
  return function search(req, res, next) {
    app.service('/api/states').remove(null).then(response => {
      return res.send({"Success": _.size(response) + " States are deleted."});
    })
  };
};

