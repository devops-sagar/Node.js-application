'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');

// Setup server
var app = express();

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token');
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

var config = require('./config/environment');
global.CONFIG = config
global.fs = require('fs');
var fs = global.fs;
global.PATH = require('path');
var PATH = global.PATH;
global.ROOT_PATH = __dirname;
var bodyParser = require('body-parser');
global.jwt = require('jwt-simple');
global.moment = require('moment');
var Sequelize = require('sequelize');
var basename  = PATH.basename(module.filename);
global.common_function = require('./common/common_function');

	
var server = require('http').createServer(app);
app.use(bodyParser.json({type: 'application/json'}));
require('./config/express')(app);
require('./routes')(app);


// Start server
server.listen(config.server.port, config.server.host, function () {
    console.log('Express server listening on %d, in %s mode', config.server.port, app.get('env'));
});

// Expose app
exports = module.exports = app;