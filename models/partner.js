var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partnerSchema = new Schema({
   org_name : String,  //organisation name
   description : String,
   mission     : String,
   website    : String,
   projects : [{ type: Schema.Types.ObjectId, ref :'Project' }],
   user : {
      index : true,
   	type :  Schema.Types.ObjectId,
   	ref : 'User'
   }
});

partnerSchema.methods.getProjects = function(){
  //return the list of partner project
};

partnerSchema.statics.getPartnerProfile = function(id){
   return this.findById(id)
           .populate('user','-salt -hash_password' )
           .exec()
           .then(function(doc){
              return doc;
           })
           .catch(function(err){
             return err;
           });

};

partnerSchema.statics.updatePartnerProfile = function(id,data){
   let org_name = data.org_name;
   let description = data.description;
   let mission = data.mission;
   let website = data.website;   
   //do any changes if you want.
   return  this.findById(id)
           .populate('user','-salt -hash_password' ) //retreiving the user field except salt and password
           .exec()
           .then(function(partner){
              partner.org_name = org_name;
              partner.description = description;
              partner.mission = mission;
              partner.website = website;
              return partner.save(); //saving the partner
           })
           .catch(function(err){
             console.log("ERROR: partner profile update failed:",err);
             return Promise.reject({error : 'Partner Profile failed to save..'});
           });
}

module.exports = mongoose.model('Partner',partnerSchema);