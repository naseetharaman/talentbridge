var project = require('../../models/Project');

/*
 registration method for user registration

 @params username
 @params password
 @params confirmpassword  //discuss and include
 */
module.exports.createProject = function(req, res, next) {

    /**
     description : String,
     mission   : String,
     category   : [String],   // List of categories
     estimate_impact : {
		money_saved : String,
		people_impacted : String,
		estimated_impact : String
	},
     status : {
	    type : String,   // list of enum values
	    enum : PROJECT_STATUS
	},
     contributors : [Schema.Types.ObjectId]   //References to contributor object
     */
    /*
      1. create project.
      */
        var role = req.body.role; //it can be array of possible roles

        var project = new  project();
        project.username = username;
        user.email = email;
        user.roles = role;
        user.hashPassword(password);

        //TODO: Check if the user already registered.
        user.save()
            .then(function(user){
                console.log("login user created");
                return Promise.resolve();
            })
            .catch(function(err){
                console.log("login user creation failed");
                return Promise.reject(err);
            })
            .then(function(){
                return user.createUserByRole()
                    .then(function(roleUsers){
                        console.log("role user created...");
                        console.log(roleUsers);
                    }).catch(function(err){
                        //delete the user object created if role user creation fails in order to rollback
                        return err;
                    })
            })
            .then(function(){
                return res.json({"message" : "Registration is successfully completed"});
            })
            .catch(function(err){
                return  res.status(403).json({'error' :err});
            });

        }

module.exports.getProject = function(req,res,next){

    if(!req.user || req.user.roles.indexOf('CONTRIBUTOR') === '-1' || req.user.roles.indexOf('PARTNER') === '-1'){
        return res.status(403).json({'error' : 'permission denied to access contributor details.'});
    }

    var projectId = req.params.project_id;
    //cross check the project id.
    project
        .findById(projectId)
        .then(function(project){
            return res.json(project);
        })
        .catch(function(err){
            return res.status(403).json(err);
        });
};

module.exports.updateProject = function(req,res,next){

};
