// Mongo DB app

var MongoClient = require('mongodb').MongoClient;

// Connecting to mongodb local server
MongoClient.connect('mongodb://localhost:27017', function(err, DB) {
    if(err) {
    	console.log('Failed to connect to local mongodb server...');
    }
    else {
    	console.log(DB);
    }
});