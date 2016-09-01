
var path = require('path'),
    express = require('express'),
    server = express(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mustache = require('mustache-express'),
    mainRoute = require('./routes/main/routes'),
    weatherRoute = require('./routes/weather/routes');

server.listen(3000);

// USE PARSING MIDDLEWARE
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

// SETUP VIEW ENGINE
server.engine('mustache', mustache());
server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));

// SPECIFY STATIC ROUTE
server.use('/assets', express.static(path.join(__dirname, 'assets')));

// SPECIFY ROUTES MODULE
server.use('/', mainRoute);
server.use('/weather', weatherRoute);

// EXPORT SERVER SETUP
module.exports = server;