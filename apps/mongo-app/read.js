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

app.get('/exactArrayMatch', function(req, res) {
	return DB.collection('list').find({
		"Genre": ["Action", "Adventure", "Comedy"]
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/findItemInArray', function(req, res) {
	return DB.collection('list').find({
		"Genre": "Action"
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/arraySpecificPositionMatch', function(req, res) {
	return DB.collection('list').find({
		"Actors.1": "Chris Evans"
	}, { "Title": 1, "_id": 0 }).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

// Query operator based queries
app.get('/gt', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": { "$gt": 90 }
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/gte', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": { "$gte": 95 }
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/lt', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": { "$lt": 80 }
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/lte', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": { "$lte": 75 }
	}).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/ne', function(req, res) {
	return DB.collection('list').find({
		"Tomato.meter": { "$ne": 10 }
	}, { "Title": 1 }).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function() {
			res.send('Data not found!');
		});
});	

app.get('/in', function(req, res) {
	return DB.collection('list').find({
		"Actors": { "$in": ["Robert Downey Jr."] }
	}, { "Title": 1 }).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function(err) {
			console.log(err);
			res.send('Data not found!');
		});
});	

// Element operators
app.get('/exists', function(req, res) {
	return DB.collection('list').find({
		"reviewed": { "$exists": true }
	}, { "Title": 1 }).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function(err) {
			console.log(err);
			res.send('Data not found!');
		});
});	

app.get('/type', function(req, res) {
	return DB.collection('list').find({
		"reviewed": { "$type": "bool" }
	}, { "Title": 1 }).toArray()
		.then(function(movies) {
			res.send(movies);
		})
		.catch(function(err) {
			console.log(err);
			res.send('Data not found!');
		});
});	







