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
	},
	photo : {
		type: String
	}

});

var Employee = module.exports = mongoose.model('Employee', employeeSchema);

// get users

module.exports.getEmployees = function(callback , limit){
     Employee.find(callback).limit(limit);
}

// add user

module.exports.addEmployees = function(employee, callback){
		Employee.create(employee , callback);
}


// update user

module.exports.updateEmployees = function(id, employee , callback , options ){
	var query = {_id : id};

	var update = {
		name : employee.name,
		status : employee.status,
		age : employee.age,
		address : employee.address,
		photo : employee.photo
	}
	Employee.findOneAndUpdate(query, update, options, callback);
}

// delete user

module.exports.deleteEmployees = function(id , callback){
	var query = {_id : id};

	Employee.remove(query , callback);
}