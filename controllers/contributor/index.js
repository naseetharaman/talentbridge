var Contributor = require('../../models/contributor');

module.exports.getPartner = function(req,res,next){

    if(!req.user || req.user.roles.indexOf('CONTRIBUTOR') === '-1'){
         return res.status(403).json({'error' : 'permission denied to access contributor details.'});
     }

     var contributorId = req.params.contributor_id;
     //cross check the contributor id.
     Contributor
     .findById(contributorId)
     .then(function(contributor){
        return res.json(contributor);
     })
     .catch(function(err){
       return res.status(403).json(err);
     });
}