'use strict';

/* eslint no-console: 0 */

var express = require('express'),
    kraken = require('kraken-js'),
   
    http = require('http');
    

var db = require('./lib/database');
var configPassport = require('./lib/passport-setup');


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        var mountpath = config.get('express:mountpath');
        app.get('/favicon.ico', function (req, res) {
            res.redirect(mountpath + req.path);
        });
        //TODO: move the db config to config.json file 
        var dbConfig = {
            'host' : 'localhost',
            'database' : 'talentbridge'
        };
        db.config(dbConfig);
        configPassport.setupPassport(app);
        next(null, config);
    },
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.PORT || 8000);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
