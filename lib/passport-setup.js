var User = require('../models/user');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

function configureStrategy() {
	passport.use('login',new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, 
		function(email,password,done){
          User.findOne({'email' :email} ,function(err,user){
           if(err) { return done(err); }

           if(!user){
           	 return done(null ,false, {message: 'Incorrect username'});
           }
           if(!user.validatePassword(password)){
           	 return done(null, false,{message : 'Incorrect password'});
           }
            return done(null,user);
          });
	  }));

	
  //serializing data into session
  passport.serializeUser(function(user, done) {
      console.log("serializing user....");
      done(null, user.id); //check is this correct ?
  });

  passport.deserializeUser(function(id, done) {
    console.log("Deserializing user....", id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
	
}
//Setup the passport local strategy 
module.exports.setupPassport = function(app){
  app.on('middleware:after:session',function configPassport(){
    console.log("configuring passport...");
    configureStrategy();
    app.use(passport.initialize());
    app.use(passport.session());
  })

	
}
