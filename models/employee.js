var mongoose = require('mongoose');

var Employee = mongoose.model('Employee',
           {
            name: String, 
           	first_name: String, 
           	corpid: {
              type : String,
              index :true
            },
           	meeting : [{
           		start_time : String,
           		end_time : String,
           		content : String,
           		subject : String
           	}],


});

module.exports = Employee;