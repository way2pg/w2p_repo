const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');

const winston = require('winston');
const logger = require('feathers-logger');
const moment = require('moment');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
/*const socketio = require('feathers-socketio');*/

const nodemailer = require('nodemailer');
const Mailer = require('feathers-mailer');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongodb = require('./mongodb');
const agenda = require('./agenda')

const authentication = require('./authentication');
const feathersio = require('./socketio')
const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

const app = feathers();

const logDir = '../../app-logs';
const fs = require('fs');


if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}


app.configure(configuration());
app.use(busboyBodyParser());
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use(feathers.static(app.get('public')));

const tsFormat = () => (new Date()).toLocaleTimeString();

function _timestamp() {
  return moment().format("YYYY-MM-DD HH:mm:ss.SSS");
}

// Load dependency
var solr = require('solr-client');







app.configure(logger(
  new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        timestamp: _timestamp,
        handleExceptions: true,
        colorize: true,
      }),
      new (require('winston-daily-rotate-file'))({
        filename: `${logDir}/_application.log`,
        timestamp: _timestamp,
        datePattern: 'yyyy_MM_dd',
        prepend: true,
        json: false
      })
    ]
  })
));
app.configure(hooks());
app.configure(mongodb);
app.configure(agenda);
app.configure(rest());
app.configure(feathersio);
app.configure(authentication);
app.configure(middleware);
app.configure(services);

app.use('/', (req, res) => {
  console.log(req)
  res.sendFile(app.get('public')+'/index.html');
})

app.hooks(appHooks);
app.use(notFound());
app.use(handler());
module.exports = app;
