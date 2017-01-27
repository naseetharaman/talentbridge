var project = require('../../models/project/project');

/*
 Method to create new Project
 @params req - request object
 @params res - response object
 */
project.checkMandatoryFields = function (req) {
    if (!req.body.description || !req.body.project_mission || !req.body.roles
        || !req.body.project_category || !req.body.estimate_impact
        || !req.body.status) {
        return res.status(403).json({error: 'Validation error: description field is mandatory'});
    }
};
module.exports.createProject = function (req, res, next) {

    var project = new project();

    //check for mandatory fields
    project.checkMandatoryFields(req).then(function (req) {
        project.description = req.body.description;
        project.project_mission = req.body.project_mission;
        project.roles = req.body.role;
        project.project_category = req.body.project_category;
        project.estimate_impact = req.body.estimate_impact;
        project.status = req.body.status;
        // When a new project is created, most of the time contributor field would be blank
        if (req.body.contributors !== null) {
            project.contributors = req.body.contributors;
        }
        project.save()
            .then(function (project) {
                console.log("New project has been created");
                return Promise.resolve();
            })
            .catch(function (err) {
                console.log("Failed to create new project");
                return Promise.reject(err);
            })
            .then(function () {
                return res.json({"message": "Project has been created sucessfully"});
            })
            .catch(function (err) {
                return res.status(401).json({'error': err});
            });
    });
};

module.exports.getProject = function (req, res, next) {

    if (!req.project) {
        return res.status(403).json({'error': 'permission denied to access project details.'});
    }

    var projectId = req.params.project_id;
    //cross check the project id.
    project
        .findById(projectId)
        .then(function (project) {
            if (project) return res.json({doc: project});
            return res.json({message: "Project does not exists"});
        })
        .catch(function (err) {
            return res.status(403).json(err);
        });
};

module.exports.updateProjectStatus = function (req, res, next) {
    var projectId = req.params.project_id;

    project.updateProjectStatus(projectid, data)
        .then(function () {
            return res.json({message: 'Project updates have been saved successfully'});
        })
        .catch(function (err) {
            return res.json({error: err.error})
        })
};
