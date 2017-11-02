var  mongoose = require('mongoose');

//  user schema

var employeeSchema = mongoose.Schema({
	name : {
		type: String,
		required: true
	},
	status : {
		type: String,

	},
	age : {
		type: Number,
	},
	address : {
		type: String,
	}

});

var Employee = module.exports = mongoose.model('Employee', employeeSchema);

// get users

module.exports.getEmployees = function(callback , limit){
     Employee.find(callback).limit(limit);
}