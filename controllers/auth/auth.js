
//require your models
var User = require('../../models/user');

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

   //return res.json(user);
   user.createUserByRole()
   .then(function(roleUsers){
   	  console.log("role user created");
   	  return user.save();
   }).then(function(user){
   	  console.log("login user created");
   	  res.json({"message" : "Registration is successfully completed"});
   }).catch(function(){
      res.status(403).json({"error" : "Registration process failed"});
      //delete the usercreation and roles. bcoz it is user creation is transaction 
   })

   


}

module.exports.login = function(req,res,next){
	//invoke the passport login call 

}