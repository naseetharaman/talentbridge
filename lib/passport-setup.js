var User = require('../models/user');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

function configureStrategy() {
	passport.use('login',new LocalStrategy( 
		function(email,password,done){
          User.findOne({'email' :email} ,function(err,user){
           if(err) { return done(err); }

           if(!user){
           	 return done(null ,false, {message: 'Incorrect username'});
           }
           if(user.validatePassword(password)){
           	 return done(null, false,{message : 'Incorrect password'});
           }
            return done(null,user);
          });
	  }));

	//serialize user and deseralize user
	
}
//Setup the passport local strategy 
module.exports.setupPassport = function(app){
	configureStrategy();
	app.use(passport.initialize());
	app.use(passport.session());

}