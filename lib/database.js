'use strict';

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // using bluebird promise instead of own mongoose promise.
var db = function(){
  return {

  	config : function(conf) {
  		mongoose.connect('mongodb://'+conf.host+'/'+conf.database);
  		var db = mongoose.connection;
  		db.on('error', console.error.bind(console,'connection error:'));
  		db.once('open', function (){
  			console.log('db connection open..');
  		});
  		function closeDB(){
  			console.log('closing the db connection..');
  			db.close();
  			process.exit(0);
  		}
  		process.on('SIGINT', closeDB).on('SIGTERM',closeDB)
  	}

  }
}

module.exports = db();