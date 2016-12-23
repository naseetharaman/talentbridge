const IndexModel = require('../models/index');
var  authCtrl = require('../controllers/auth/auth');
var path = require('path');

//console.log("Hello");

module.exports = function(router) {
  //console.log("Hello");
  //Prepare a landing page for home page to show information about MyTransport application
  router.get('/',function(req,res,next){
  	res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
  });


   router.post('/register', authCtrl.register);


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
