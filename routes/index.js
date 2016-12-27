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

   router.get('/auth-test', function(req,res,next){
       return res.json({'user': req.user});
   })
   
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