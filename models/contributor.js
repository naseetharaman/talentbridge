var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contributorSchema = new Schema({
   
   //add more fields below like  github url , website/blog url.
   Skills : [String], //Array of skills
   projects : [{ type: Schema.Types.ObjectId, ref :'Project' }],
   user : {
   	index :true,
   	type :  Schema.Types.ObjectId,
   	ref : 'User'
   }
});

contributorSchema.methods.getProjects = function(){
  //return the list of partner project
};

module.exports = mongoose.model('Contributor',contributorSchema);