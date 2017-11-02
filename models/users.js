const  mongoose = require('mongoose');

//  user schema

const userSchema = mongoose.Schema({
	name : {
		type: String,
		required: true
	}

});

const User = module.exports = mongoose.model('User', userSchema);

// get users

module.exports.getUsers = (callback , limit) => {
	User.find(callback).limit(limit);
}

// add user

module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

// Update users

module.exports.updateUser = (id ,user , options, callback) => {
	var query = {_id: id};

	var update = {
		name: user.name
	}
	User.findOneAndUpdate(query, update, options, callback);

}
// remove user

module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query , callback);

}