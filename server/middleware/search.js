module.exports = function (app) {
  return function search(req, res, next) {
    console.log(app)
    return res.send({"Success": "File Deleted"});
  };
};
