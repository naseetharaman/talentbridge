var Partner = require('../../models/partner');

module.exports.getPartnerProfile = function(req,res,next){

    //Only the  partner himself can see his profile
    if(req.user.roles.indexOf('PARTNER') == '-1'){
        return res.status(403).json({'error' : 'permission denied to access partner details.'});
    }

    var partnerId = req.params.partner_id;
    //cross check the partner id.
    Partner
        .getPartnerProfile(partnerId)
        .then(function(partner){
            if(partner) return res.json({ 'data' :partner });
            return res.json({ message : "User does not exists"});
        })
        .catch(function(err){
            return res.status(403).json({'error' : err.error});
        })
}

module.exports.updatePartnerProfile = function(req,res,next){

    //Only the  partner himself can see his profile.
    //so check whether his partner_id is rightly mapped to user
    if(req.user.roles.indexOf('PARTNER') == '-1'){
        return res.status(403).json({'error' : 'permission denied to access partner details.'});
    }

    //Skills has to be the list of skill value.we don't have decided any schema to skills
    if(!req.body.org_name || !req.body.description || !req.body.mission || !req.body.website){
        return res.status(403).json({error:'Validation error: org_name/description/mission/website fields  are mandatory'});
    }

    var partnerId = req.params.partner_id;

    //validating below to cross check the own user is updating the profile
    var sessionContrib_id = req.user.partner_id || "";
    if(sessionContrib_id != partnerId ){
        return res.status(403).json({'error' : 'permission denied to access partner details.'});
    }
    var data = Object.assign({},req.body);
    Partner
        .updatePartnerProfile(partnerId,data)
        .then(function(partner){
            return res.json({message : 'Partner profile has been saved successfully'});
        })
        .catch(function(err){
            return res.status(403).json({error :err.error});
        })
}
