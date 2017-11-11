var express = require('express');
var app = express();
var multer = require('multer');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

User = require('./models/users');
Employee = require('./models/employees');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));


//connect to mongoose
mongoose.connect('mongodb://localhost/employees');
var db = mongoose.connection;

// Init upload

var storage = multer.diskStorage ({
	destination: function(req,file, cb) {
		cb(null ,'uploads/')
	},
	filename: function (req,file,cb) {
		cb(null ,file.fieldname + '-' + Date.now() + '.jpg')
	}
});

var upload = multer({ storage : storage }).single('profileImage');

app.post('/profile/:id', function(req, res) {
  upload(req, res, function(err) {
    if(err) {
      return res.status(400).json({msg: err});
    }
    Employee.update({_id: req.params.id}, {$set: {profileImage: req.file.path}}, function(err, result) {
        if(err)
          return res.status(400).json({msg: err});
        return res.status(200).json({msg:"image uploaded"})
      });
  }); 
});
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

app.post('/api/employees', (req,res) => {
	var employee = req.body;
	//console.log(user, req.body, "==================> users")

	Employee.addEmployees(employee , (err ,employee) => {
		if(err) {
				throw err;
		}
		res.json (employee);
	});
});

app.put('/api/employees/:_id' , (req,res) => {
	var id = req.params._id;
	var employee = req.body;

	Employee.updateEmployees(id , employee, {new: true} , (err , employee) => {
			if (err) {
				throw err;
			}

			res.json(employee);
	});
});

app.delete('/api/employees/:_id' , (req , res ) => {
	var id = req.params._id;
	Employee.deleteEmployees(id, (err , user) => {
		if(err) {
				throw err;

		}

		res.json(employee);
	});
});


app.listen(2000);
console.log("server at listening at 2000 port");