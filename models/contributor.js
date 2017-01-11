var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contributorSchema = new Schema({
   
   //add more fields below like  github url , website/blog url.
   skills : [String], //Array of skills
   projects : [{ type: Schema.Types.ObjectId, ref :'Project' }],
   user : {
   	index :true,
   	type :  Schema.Types.ObjectId,
   	ref : 'User'
   }
});

contributorSchema.statics.getProjects = function(){
  //return the list of contributor project
};

contributorSchema.statics.getContributorProfile = function(id){
   return this.findById(id)
           .populate('user','-salt -hash_password' )
           .then(function(doc){
              return doc;
           })
           .catch(function(err){
             return err;
           });
   
   
};

contributorSchema.statics.updateContributorProfile= function(id,data){
   //if you want to check any modfication for skills do here before calling mongoose api

   //TODO : Try to wrap the code in Promise.try() bluebird method. 
   var contribSkills = data.skills;
   return this.findById(id)
           .populate('user','-salt -hash_password' ) //retreiving the user field
           .exec()
           .then(function(contributor){
              contributor.skills =  contribSkills;
              return contributor.save()
           })
           .catch(function(err){
           	 console.log("ERROR: contributor profile update failed:",err);
             return Promise.reject({error : 'Contributor Profile failed to save..'});
           });
   
   
};




module.exports = mongoose.model('Contributor',contributorSchema);