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

module.exports = mongoose.model('Partner',partnerSchema);