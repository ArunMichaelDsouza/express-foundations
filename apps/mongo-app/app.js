// Mongo DB app

var MongoClient = require('mongodb').MongoClient;

// Connecting to mongodb local server
MongoClient.connect('mongodb://localhost:27017/users')
	.then(function(DB) {
		return DB.collection('list').find({}).toArray();
	})
	.then(function(userList) {
		console.log(userList);
	})
	.catch(function(err) {
		console.log(err);
	});