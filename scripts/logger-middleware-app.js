// Custom logging middleware app

var express = require('express'),
	path = require('path'),
	app = express(),
	logger = require('./logger-middleware'); // Including middleware module

	// Add logger options
	logger.options({
		httpMethod: true
	});

app.use(logger.call); // Applying middleware module

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.get('/getData', function(req, res) {
	res.json({
		id: 45
	});
});

app.listen(8000, function() {
	console.log('Server running...');
});

