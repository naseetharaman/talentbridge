var Contributor = require('../../models/contributor');

module.exports.getContributorProfile = function(req,res,next){
    
    //Allow the partner to see the contributor profile
    
    //TODO : Only Partner or self user  can see the contrib profile details 
     var contributorId = req.params.contrib_id ;
     var sessionContrib_id = req.user.contributor_id || "";
     // if(sessionContrib_id !== contributorId || req.user.roles.indexOf('PARTNER') === '-1' ){
     //    return res.status(403).json({'error' : 'permission denied to access contributor details.'});
     // }
     
     Contributor
     .getContributorProfile(contributorId)
     .then(function(contributor){
        if(contributor) return res.json({ data : contributor })
        return res.json({ message : "User does not exists"});
     })
     .catch(function(err){
       return res.status(403).json(err);
     });
     
}

module.exports.updateContributorProfile = function(req,res,next){

   //Skills has to be the list of skill value.we don't have decided any schema to skills
  if(!req.body.skills || !req.body.expertise){
       return res.status(403).json({error:'Validation error: skills fields  are mandatory'});
   }
   var contributorId = req.params.contrib_id ;
   
   //validating below to cross check the own user is updating the profile
   var sessionContrib_id = req.user.contributor_id || "";
   if(sessionContrib_id != contributorId ){
        return res.status(403).json({'error' : 'permission denied to access contributor details.'});
   }
   //copying req.body data and check if skills are sent has multiple value
   
   var data = Object.assign({},req.body);
   if(typeof data.skills == 'string'){
     data.skills = [data.skills];
   }
   if(typeof data.expertise == 'string'){
     data.expertise = [data.expertise];
   }

   //Invoke the contributor model and send the id and data.
   Contributor.updateContributorProfile(contributorId, data)
   .then(function(){
     return res.json({message : 'Contributor profile has been saved successfully'});
   })
   .catch(function(err){
     return res.json({error : err.error})
   })
    
}