'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PROJECT_STATUS = ['DEFINED','IN_PROGRESS','ACTIVE','DECLINED'];
var projectSchema = new Schema({
	title : String,
    description : String,
	project_mission   : String,
	project_category   : [String],   // List of categories
	estimate_impact : {
		money_saved : String,
		people_impacted : String,
		estimated_impact : String
	},
	status : {
	 type :String,   // list of enum values
	 enum : PROJECT_STATUS
	},
	contributors : [Schema.Types.ObjectId]   //References to contributor object
});

module.exports = mongoose.model('Project',projectSchema);
