
//require your models
var User = require('../../models/user');
var passport = require('passport');
/*
   registration method for user registration

   @params username
   @params password
   @params confirmpassword  //discuss and include
*/
module.exports.register = function(req,res,next){
   
   /*
       Get the username ,email, password ,role
       1. create user.
       2. if role is contributor create contributor record , else if role is partner create partner record else both create contrib/partner
         ie., based on role create dynamic create creation.
   */
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;
   var role = req.body.role; //it should be array of possible roles

   var user = new  User();
   user.username = username;
   user.email = email;
   user.roles = role;
   user.hashPassword(password);

   // var userRolesById= {
   //    partner_id : null,
   //    contributor_id : null
   // };

   //return res.json(user);
   user.createUserByRole()
   .then(function(roleUsers){
   	  console.log("role user created");
        // if(roleUsers.partner) userRolesId.partner_id = roleUsers.partner._id;
        // if(roleUsers.contributor) userRolesId.contributor_id = roleUsers.contributor._id;
   	  return user.save();
   }).then(function(user){
   	  console.log("login user created");
        // var jsontoken = user.generateJwt(userRolesById);
        // //create a cookie named token to be sent in response.
        // res.cookie('tbtoken',jsontoken);
   	  res.json({"message" : "Registration is successfully completed"});
   }).catch(function(){
      res.status(403).json({"error" : "Registration process failed"});
      //delete the usercreation and roles. bcoz it is user creation is transaction 
   })

   


}

module.exports.login = function(req,res,next){
	//invoke the passport login call 
    passport.authenticate('login',function(err,user,info){
         if(err){
            return res.status(403).json({'error' : err});
         }

         if(!user){
            return res.status(403).json({'error': info.message});
         }

         req.logIn(user,function(err){
            if(err){ 
               return res.status(403).json({'error' : err});
            }
            //console.log(req.user ,"=====", req.session);

            //Get the user id and role  and set it in cookie and send it as json webtoken
            return res.json({'message': 'Log in Succesfull. Your session has been created'});
         });


    })(req,res,next);
}


module.exports.checkRoles = function(req,roles){

}
