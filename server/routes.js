/**
 * Main application routes
 */

'use strict';


module.exports = function (app) {
	
    SetupRoutes(app);
    // AdminSetupRoutes(app);
    // All undefined asset or api routes should return a 404
    // app.route('/:url(api|auth|components|app|bower_components|assets|login|logout)/*').get(errors[404]);
    app.all('/*', PageNotFound);
    // All other routes should redirect to the index.html
    app.route('/*').get(function (req, res) {
        res.sendfile(app.get('appPath') + '/index.html');
    });
};