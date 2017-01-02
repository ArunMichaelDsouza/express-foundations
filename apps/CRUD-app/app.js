// Quotes CRUD app

var express = require('express'),
	bodyParser = require('body-parser'),
	MongoClient = require('mongodb').MongoClient,
	commonConsts = require('./config/commonConsts'),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));

var dbUrl = 'mongodb://'+ commonConsts.database.username +':'+ commonConsts.database.password + commonConsts.database.url;

console.log('Connecting to Database...');
MongoClient.connect(dbUrl, function(err, db) {
	if(err) {
		console.log('Cannot connect to Database...');
		console.log(err);
		return;
	}

	require('./router')(app);

	app.listen(8000, function() {
		console.log('Database connected!');
	});
});

