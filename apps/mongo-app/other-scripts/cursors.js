// Cursor implementation

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/crunchbase')
	.then(function(db) {

		// Define cursor object
		var cursor = db.collection('companies').find({
			'category_code': 'biotech'
		});

		// Add projection to cursor object
		cursor.project({
			'name': 1,
			'_id': 0
		});

		cursor.forEach(function(doc) {
			console.log(doc);
		}, function(err) {
			console.log(err);
		});
	})
	.catch(function(err) {
		console.log('Some error occurred!');
	});