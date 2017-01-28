// Cursor implementation

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/crunchbase')
	.then(function(db) {
		var cursor = db.collection('companies').find({
			'category_code': 'biotech'
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