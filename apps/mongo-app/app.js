// Mongo DB app

var MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    DB;

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));

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
    return DB.collection('list').findOne({ name: req.params.user })
        .then(function(user) {
            var id = req.query.id === 'true' ? user._id : null,
                uid = req.query.uid === 'true' ? user.uid : null;

            user ? res.render('user', {
                name: user.name,
                id: id,
                uid: uid
            }) : res.send('User not found!');
        })
        .catch(function(err) {
            res.send('Some error occurred!');
        });
});

// Route to add new user
app.post('/addUser', function(req, res) {
	if(!req.body.name && !req.body.uid) {
		res.send('Name and uid are required!');
	}

    return DB.collection('list').insertOne({ 
    		name: req.body.name,
    		uid: parseInt(req.body.uid, 10)
    	})
        .then(function() {
            res.redirect('/');
        })
        .catch(function() {
            res.send('Some error occurred!');
        });
});

// Route to add users in bulk
app.post('/bulkAddUsers', function(req, res) {
    var users = [{
        name: 'Jonah',
        uid: 117
    }, {
        name: 'Miles',
        uid: 118
    }];

    return DB.collection('list').insertMany(users)
        .then(function() {
            res.redirect('/');
        })
        .catch(function() {
            res.send('Some error occurred!');
        });
});
