// Mongo fetch queries

var MongoClient = require('mongodb').MongoClient,
	movies = require('./data').movies,
	express = require('express'),
	app = express(),
	DB;

// Database connection
console.log('Connecting to database...');
MongoClient.connect('mongodb://localhost:27017/movies')
	.then(function(db) {
		DB = db;
		console.log('Connected to database!');

		return //DB.collection('list').insertMany(movies)
	})
	.then(function() {
		//console.log('Data saved to database!');

		app.listen(8000, function() {
			console.log('Server running...');
		});
	})
	.catch(function() {
		console.log('Some error occurred');
	});

// Data fetch queries
app.get('/keyInObject', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": 85
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	









