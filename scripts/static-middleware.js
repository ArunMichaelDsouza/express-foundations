// Static middleware implementation

var express = require('express'),
	app = express(),
	path = require('path');

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname+'/public/index.html');
// });

// Use express static middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

// Api route to get data
app.get('/getData', function(req, res) {
	res.json({
		id: 45
	});
});

app.listen(8000, function() {
	console.log('Server running...');
});