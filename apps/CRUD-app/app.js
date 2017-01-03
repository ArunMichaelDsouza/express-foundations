// Quotes CRUD app

var express = require('express'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    commonConsts = {
    	database: {
	        username: 'admin',
	        password: '123456',
	        url: '@ds011830.mlab.com:11830/amd-quotes-app'
	    }
    },
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = 'mongodb://' + commonConsts.database.username + ':' + commonConsts.database.password + commonConsts.database.url;

console.log('Connecting to Database...');
MongoClient.connect(dbUrl, function(err, db) {
    if (err) {
        console.log('Cannot connect to Database...');
        console.log(err);
        return;
    }

    app.get('/', function(req, res) {
		res.redirect('/quotes');
	});

	app.get('/quotes', function(req, res) {
		res.send('quotes');
	});

    app.listen(8000, function() {
        console.log('Database connected!');
    });
});
