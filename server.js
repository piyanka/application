var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

User = require('./models/users');
Employee = require('./models/employees');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
//connect to mongoose
mongoose.connect('mongodb://localhost/employees');
var db = mongoose.connection;

app.get('/' , function(req,res){
	res.send('hii');

});

app.get('/api/users', (req,res) => {
		User.getUsers((err, users) => {
			if(err){
				throw err;
			}
			res.json(users);
		}); 
});

app.post('/api/users', (req,res) => {
	var user = req.body;
	//console.log(user, req.body, "==================> users")
	User.addUser(user , (err ,user) => {
		if(err) {
				throw err;
		}
		res.json (user);
	});
});

app.put('/api/users/:_id' , (req,res) => {
	var id = req.params._id;
	var user = req.body;

	User.updateUser(id , user, {new: true} , (err , user) => {
			if (err) {
				throw err;
			}

			res.json(user);
	});
});

app.delete('/api/users/:_id' , (req , res ) => {
	var id = req.params._id;
	User.removeUser(id, (err , user) => {
		if(err) {
				throw err;

		}

		res.json(user);
	});
});

app.get('/api/employees' , function(req,res){
	Employee.getEmployees(function(err ,employees){
		if(err) {
			throw err;

		}
		res.json(employees);
	});
});


app.listen(2000);
console.log("server at listening at 2000 port");