const IndexModel = require('../models/index');
var  authCtrl = require('../controllers/auth/auth');
var partnerCtrl = require('../controllers/partner');
var contribCtrl = require('../controllers/contributor');
var projectCtrl = require('../controllers/project');
var path = require('path');



module.exports = function(router) {
  router.get('/',function(req,res,next){
  	res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
  });

   //route to test the user authentication
   router.get('/auth-test', function(req,res,next){
       if(!req.user){
         return res.status(403).json({'error' : 'Please Log in to access'});
       }
       var user = Object.assign({},req.user.toJSON());
       delete user.hash_password ; delete user.salt;
       return res.json({'user': user});
   });

   router.post('/register', authCtrl.register);
   router.post('/login',authCtrl.login);

   //Get the partner id from  the user id.
   router.get('/user/:user_id/partner_info' ,function(){

   });

   //Get the contributor id from the user id.
   router.get('/user/:user_id/contributor_info',function(){

   });
   //permission allowed to authenticated partner and admin
   router.get('/partner/:partner_id', partnerCtrl.getPartner);

   router.put('/partner/:partner_id', partnerCtrl.updatePartner);

   router.get('/contributor/:contrib_id', contribCtrl.getContributor);

   router.put('/contributor/:contrib_id', contribCtrl.updateContributor);

    /**
     — Create Project
     — modify project fields
     — Update Project Status
     — retrieve projects based on status
     — update project rating
     — Update number of contributors to the project
     — Add Contributors to the project
     — Retrieve Contributors assigned to the project
     — update Contributors assigned to the project
     — delete Contributors assigned to the project
     */
    router.post('/project', projectCtrl.createProject);
    router.get('/project/:project_id', projectCtrl.getProject);
    router.put('/project/:project_id',projectCtrl.updateProject);
    router.put('/project/: project/?action="updateStatus"',projectCtrl.updateProjectStatus);
    router.put('/project/:project_id',projectCtrl.updateProject);
    router.put('/project/:project_id',projectCtrl.updateProject);

}


/*
  How to access the user information either through role id (partner/contributor) or user id


*/
