'use strict';

var Promise = require('bluebird');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PARTNER_ROLE ='PARTNER';
const CONTRIBUTOR_ROLE = 'CONTRIBUTOR';
const ADMIN_ROLE = 'ADMIN'; 

var secret = 'TalentBridgeSecret'; //TODO: Move this secret to config


var Partner = require('./partner');
var Contributor = require('./contributor');

var addressSchema = new Schema({
   street_line1 : String,
   street_line2 : String,
   city : String,
   state : String,
   zip  : String,
   country : String
});



var userSchema = new Schema({
	username : { 
		type :String,
    required : true
	},
	hash_password : String, //hashed paasword
	salt : String,
	first_name : String,
	last_name : String,
	email : {
		type : String,
		required : true,
		index : true,
		unique : true
	},
	roles : {
		type : [String]
		
	},
	address :[addressSchema],
	mobile : String, //validation has to be followed
  partner_id : { //if he is partner , set the partner id
   type :  Schema.Types.ObjectId
  },
  contributor_id : { //if he is user , set the contributor id
    type :  Schema.Types.ObjectId
  }

	

});

userSchema.methods.hashPassword = function(password){
   console.log("hashing password..");
   this.salt = crypto.randomBytes(16).toString('hex');
   //TODO: Convert this below sync call to async call
   this.hash_password = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password){
  console.log("validating password..");
  //TODO : Convert this below sync call to async call
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
  console.log(this.hash_password === hash);
  return this.hash_password === hash;
};

userSchema.methods.isPartner = function(){
   console.log("isPartner", this.roles, this.roles.indexOf('PARTNER'));
   return this.roles.indexOf('PARTNER') > -1 
};

userSchema.methods.isContributor = function(){
  console.log("IsContrib",this.roles,this.roles.indexOf('CONTRIBUTOR') );
  return this.roles.indexOf('CONTRIBUTOR') > -1
};

userSchema.methods.generateJwt = function(){

  let expiry = new Date();
  expiry.setHours(expiry.getHours() + 1); //  1 hr expiry
  let payload = {
    email : this.email,
    username  : this.username,
    role  : this.roles,
    exp   : parseInt(expiry.getTime() /1000)
  }

  return jwt.sign(payload,secret);

}
userSchema.methods.createUserByRole = function(){
   var user = this;
   var userRoles = this.roles;
   var userId = this._id;

   //CHECK , whether we are efficiently handling error here in different scenario, if operation fails

   //TODO : the below creation logic should be rewritten efficiently and needs to be tested across diff edge cases.
   //Refer to bluebird lib(3.0 and more) @ http://bluebirdjs.com/docs/api/reflect.html. May be it will help
   var error ;

   var userByRoles={
   	'partner' : null,
   	'contributor' : null
   };
  
   return new Promise(function(resolve,reject){
      var promise = Promise.resolve();
      if(user.isPartner()){
        var partner = new Partner();
        partner.user = userId;   //mapping the user id ref into partner object
        user.partner_id = partner._id; //mapping partner id in to user object
        promise = partner.save()
                  .then(function(doc){
                    userByRoles.partner = doc;
                    return Promise.resolve();
                 })
                 .catch(function(err){
                      return Promise.reject(err);
                 });
      
    }

     promise
       .then(function(){

          if(user.isContributor()){
            var contributor = new Contributor();
            contributor.user = userId; //mapping the user id ref into contributor  object
            user.contributor_id = contributor._id // //mapping the contrib ref into user  object
            return contributor
                   .save()
                   .then(function(doc){
                     userByRoles.contributor = doc;
                     return Promise.resolve();
                   })
                   .catch(function(err){
                     return Promise.reject(err);
                   }) 
          }

       })
       .then(function(){
           //console.log(userByRoles);
           return resolve(userByRoles);
       })
       .catch(function(err){
          console.log(err);
          return reject(err);
       });


   });
  
}

userSchema.statics.getUser = function(id){
    return this.findById(id)
           .then(function(doc){
              var user = Object.assign({},doc.toJSON());
              delete user.hash_password ; delete user.salt;
              return user;
           })
           .catch(function(err){
             return Promise.reject(err);
           })
}

userSchema.statics.updateUserProfile = function(id,data){
      
     let address = {
       street_line1 : data.street_line1 || 'NA',
       street_line2 : data.street_line2 || 'NA',
       city : data.city,
       state : data.state,
       zip  : data.zip,
       country : data.country
     };
     let mobile = data.mobile;
     return this.findById(id)
            .then(function(user){
            user.mobile = mobile;
            user.address = address;
            return user.save()
                   .catch(function(err){
                      console.log("ERROR: user profile update failed:",err);
                      return Promise.reject({error : 'User Profile failed to save..'});
                   });

            });

}

module.exports = mongoose.model('User',userSchema);


/*
  TODO : Fix the above creation logic like below 

    return Promise.try(function(){
     var rolePromises = [];
     if(user.isPartner()){
        var partner = new Partner();
        partner.user = userId;
        let partnerPromise = partner.save();
        rolePromises.push(partnerPromise);
     }

     if(user.isContributor(){
        var contributor = new Contributor();
        contributor.user = userId;
        let contribPromise = contributor.save();
        rolePromises.push(contribPromise);
     })

     
    return rolePromises.all(rolePromises).spread(function(partner,contributor){
        if(partner) userByRoles.partner = partner;
        if(contributor) userByRoles.contributor = contributor;
        return userByRoles;
    });
    
  });


*/