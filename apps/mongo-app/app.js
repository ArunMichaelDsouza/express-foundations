// Mongo DB app

var MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    app = express(),
    DB;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

console.log('Connecting to database...');

// Connecting to mongodb local server
MongoClient.connect('mongodb://localhost:27017/users')
    .then(function(db) {
        DB = db;

        app.listen(8000, function() {
		    console.log('Database connected!');
		});
    })
    .catch(function(err) {
        res.send('Some error occurred!');
    });

// Root route request
app.get('/', function(req, res) {
	return DB.collection('list').find().toArray()
		.then(function(users) {
			res.render('index', {
				users: users
			});
		})
		.catch(function() {
			res.send('Some error occurred!');
		});
});

// User info route
app.get('/user/:user', function(req, res) {
	return DB.collection('list').findOne({name: req.params.user})
		.then(function(user) {
			var id = req.query.id === 'true' ? user._id : null,
				uid = req.query.uid === 'true' ? user.uid : null;

			user ? res.render('user', {
				name: user.name,
				id: id,
				uid: uid
			}) : res.send('User not found!');
		})
		.catch(function() {
			res.send('Some error occurred!');
		});	
});

