// Mongo DB app

var MongoClient = require('mongodb').MongoClient,
	express = require('express'),
	app = express();

app.set('view engine', 'jade');
app.set('views', __dirname+'/views');

app.get('/', function(req, res) {

	// Connecting to mongodb local server
	MongoClient.connect('mongodb://localhost:27017/users')
		.then(function(DB) {
			return DB.collection('list').find({}).toArray();
		})
		.then(function(userList) {
			res.render('index', {
				users: userList
			})
		})
		.catch(function(err) {
			res.send('Some error occurred!');
		});
});

app.listen(8000, function() {
	console.log('Server running...');
});
