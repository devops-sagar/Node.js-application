/**
 * Express configuration
 */

'use strict';
module.exports = function(app){
	global.express = require('express');
	var favicon = require('serve-favicon');
	var morgan = require('morgan');
	var compression = require('compression');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var cookieParser = require('cookie-parser');
	var errorHandler = require('errorhandler');
	var path = require('path');
	var config = require('./environment');
	var env = app.get('env');
	
	//app.use(express.bodyParser());
	app.use(bodyParser.json({type:'application/*+json', limit:'500mb'}));
	app.use(bodyParser.json({type:'application/json', limit:'500mb'}));
	app.use(bodyParser.urlencoded({extended:true, limit:'500mb'}));
	
	
	app.set('views', config.root + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(compression());
	app.use(methodOverride());
	app.use(bodyParser.json({type:'application/*+json'}));
	app.use(bodyParser.json({type:'application/json'}));
	app.use(bodyParser.json({ limit: '500mb'}));
	app.use(bodyParser.urlencoded({extended:true}));
	
	app.use(cookieParser());
	
	if('development' === env || 'test' === env){
		//app.use(require('connect-livereload')());
		app.use(express.static(path.join(config.root, '.tmp')));
		app.use(express.static(path.join(config.root, 'dist')));
		app.use(express.static(path.join(config.root, 'uploads')));
		app.set('appPath', config.root + '/dist');
		app.use(morgan('dev'));
		app.use(errorHandler()); // Error handler - has to be last
	}
	
	global.SetupRoutes = function(app){
		fs.readdirSync(ROOT_PATH + '/api/v1').filter(function(file){
			var stats = fs.statSync(ROOT_PATH + '/api/v1/' + file);
			return (file.indexOf('.') !== 0 && stats.isDirectory());
		}).forEach(function(file){
			var tmpRoute = require(ROOT_PATH + '/api/v1/' + file);
			tmpRoute(app);
		});
	}

	global.AdminSetupRoutes = function(app){
		fs.readdirSync(ROOT_PATH + '/api/v1/admin').filter(function(file){
			var stats = fs.statSync(ROOT_PATH + '/api/v1/admin/' + file);
			return (file.indexOf('.') !== 0 && stats.isDirectory());
		}).forEach(function(file){
			var tmpRoute = require(ROOT_PATH + '/api/v1/admin/' + file);
			tmpRoute(app);
		});
	}

	global.PageNotFound = function(req, res){
		var viewFilePath = app.get('appPath') + '/404.html';
		var statusCode = 404;
		var result = {
			status:statusCode
		};
		res.status(result.status);
		if(req.xhr){
			return res.status(result.status).json(result);
		} else{
			res.render(viewFilePath, function(err){
				if(err){ return res.status(result.status).json(result); }
				res.render(viewFilePath);
			});
		}
	}
};