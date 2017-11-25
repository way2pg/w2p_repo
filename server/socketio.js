const socketio = require('feathers-socketio');

module.exports = function () {
  const app = this;
  app.configure(socketio(function (io) {
    io.on('connection', function (socket) {

    /*  socket.on('testMail', function (data) {
        app.service('api/mailtemplates').emit("test_mail_template", data)
      });

      socket.on('testSMS', function (data) {
        console.log(data)
        app.service('api/smstemplates').emit("test_sms_template", data)
      });*/

    });

    io.use(function (socket, next) {
      //socket.feathers.data = 'Hello world';
      next();
    });

    /* io.use(function (socket, next) {
     // Authorize using the /users service
     app.service('users').find({
     username: socket.request.username,
     password: socket.request.password
     }, next);
     });*/

  }));

};


