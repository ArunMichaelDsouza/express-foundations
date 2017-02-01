var MongoClient = require('mongodb').MongoClient,
	express = require('express'),
	app = express(), DB;

MongoClient.connect('mongodb://localhost:27017/crunchbase')
	.then(function(db) {
		DB = db;

		app.listen(8000, function() {
			console.log('App connected to database...');
		});
	})
	.catch(function() {
		console.log('Some error occurred!');
	});

app.get('/deleteOne', function(req, res) {
	return DB.collection('companies').deleteOne({'name': 'Wetpaint'})
		.then(function(result) {
			res.send(result);
		})
		.catch(function(err) {
			console.log(err);
		});
});

app.get('/deleteMany', function(req, res) {
	return DB.collection('companies').deleteMany({'number_of_employees': {'$gt': 10000}})
		.then(function(result) {
			res.send(result);
		})
		.catch(function(err) {
			console.log(err);
		});
});