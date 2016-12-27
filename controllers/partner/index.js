var Partner = require('../../models/partner');

module.exports.getPartner = function(req,res,next){

    if(!req.user ) {
    	return res.status(403).json({'error' : 'You are not Logged In. Please log In'});
    } 
    if(req.user.roles.indexOf('PARTNER') == '-1'){
         return res.status(403).json({'error' : 'permission denied to access partner details.'});
     }

     var partnerId = req.params.partner_id;
     //cross check the partner id.
     Partner
     .findById(partnerId)
     .then(function(partner){
        return res.json(partner);
     })
     .catch(function(err){
       return res.status(403).json(err);
     })
}

module.exports.updatePartner = function(req,res,next){

}