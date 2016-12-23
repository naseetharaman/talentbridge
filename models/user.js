var Promise = require('bluebird');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PARTNER_ROLE ='PARTNER';
const CONTRIBUTOR_ROLE = 'CONTRIBUTOR';
const ADMIN_ROLE = 'ADMIN'; 
//var ROLES = ['PARTNER','CONTRIBUTOR','ADMIN'];

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
	mobile : Number

	

});

userSchema.methods.hashPassword = function(password){
   console.log("hashing password..");
   this.salt = crypto.randomBytes(16).toString('hex');
   this.hash_password = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
};

userSchema.methods.validatePassword = function(password){
  console.log("validating password..");
  var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.isPartner = function(){
   return this.roles.indexOf['PARTNER'] !== -1;
};

userSchema.methods.isContributor = function(){
  return this.roles.indexOf['CONTRIBUTOR'] !== -1;
};

userSchema.methods.createUserByRole = function(){
   var user = this;
   var userRoles = this.roles;
   var userId = this._id;

   //CHECK , whether we are efficiently handling error here in different scenario, if operation failed
   var promise = Promise.resolve();
   var error ;

   var userByRoles={
   	'partner' : null,
   	'contributor' : null
   }

   if(user.isPartner()){
        var partner = new Partner();
        partner.partner_detail = userId;
        promise = partner.save()
                  .then(function(partner){
                  	userByRoles.partner = partner;
                    return Promise.resolve();
                 })
        		 .catch(function(err){
        	        return Promsie.reject(err);
                 });
      
   }

   promise
   .then(function(){

      if(user.isContributor()){
      	var contributor = new Contributor();
      	contributor.contributor_detail = userId;
      	return contributor
      	       .save()
               .then(function(contributor){
               	 userByRoles.contributor = contributor;
                 return Promise.resolve();
               })
               .catch(function(err){
               	 return Promsie.reject(err);
               }) 
      }

   })
   .then(function(){
   	 return Promsie.resolve(userByRoles);
   })
   .catch(function(err){
   	  return err;
   });

   return promise;

   
}


module.exports = mongoose.model('User',userSchema);