#!/usr/bin/env node

const logger = require('winston');
const app = require('./app');
const port = process.env.PORT || app.get('port');
console.log("Port - "+port)
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  console.log('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.log(`Feathers application started on ${app.get('host')}:${port}`)
);

function graceful() {
  console.log("========= Stopping Agenda =============== 1")
  app.get("agenda").cancel({repeatInterval: {$exists: true, $ne: null}}, (err, numRemoved) => {
    app.get("agenda").stop(function () {
      console.log("========= Stopping Agenda =============== 2")
      process.exit(0);
    });
  })
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);
