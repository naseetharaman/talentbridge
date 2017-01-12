const IndexModel = require('../models/index');
var  authCtrl = require('../controllers/auth/auth');
var partnerCtrl = require('../controllers/partner');
var contribCtrl = require('../controllers/contributor');
var path = require('path');



module.exports = function(router) {
    //console.log("Hello");
    //Prepare a landing page for home page to show information about MyTransport application
    router.get('/',function(req,res,next){
        res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
    });

    //route to test the user authentication
    router.get('/auth-test', function(req,res,next){
        if(!req.user){
            return res.status(403).json({'error' : 'Please Log in to access'});
        }
        var user = Object.assign({},req.user.toJSON());
        // /console.log(user);
        delete user.hash_password ; delete user.salt;
        return res.json({'user': user});
    });

    router.post('/register', authCtrl.register);
    router.post('/login',authCtrl.login);

    //Get the partner id from  the user id.
    router.get('/user/:user_id/profile',authCtrl.verifyAuth,authCtrl.getUser);
    router.put('/user/:user_id/profile', authCtrl.verifyAuth, authCtrl.updateUser);

    //permission allowed to authenticated partner and admin
    router.get('/partner/:partner_id/profile', authCtrl.verifyAuth, partnerCtrl.getPartnerProfile);

    router.put('/partner/:partner_id/profile',authCtrl.verifyAuth, partnerCtrl.updatePartnerProfile);

    router.get('/contributor/:contrib_id/profile', authCtrl.verifyAuth, contribCtrl.getContributorProfile);

    router.put('/contributor/:contrib_id/profile', authCtrl.verifyAuth,contribCtrl.updateContributorProfile);
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

 // router.get('/project/:project_id', partnerCtrl.getPartner);

    // router.get('/*', function (req, res) {
    //     model.requestURI=req.app.kraken.get('requestURI');
    //     model.user = res.locals.user || {};
    //     model.user.role='dev';


    //     if (!model.user.role || req.app.kraken.get('DENY_ACCESS')) {
    //         model.user.unauthorized = true;
    //     }
    //     model.env = process.env.DEPLOY_ENV || 'dev';
    //     res.render('index', model);
    // });
}


/*
  How to access the user information either through role id (partner/contributor) or user id


*/
