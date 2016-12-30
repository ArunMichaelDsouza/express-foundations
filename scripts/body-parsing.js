// Request body parser

var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'), // Include body parsing middleware
	app = express();

app.use(bodyParser.urlencoded({ extended: false })); // Call body parser with options
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile('index.html');
});

app.get('/getData', function(req, res) {
	res.json({
		id: 63
	});
});

// Post request with body params sent back via response
app.post('/setData', function(req, res) {
	res.send(200).send(req.body.id);
});

app.delete('/delData', function(req, res) {
	res.sendStatus(200); // Sets request body to OK
});

app.listen(8000, function() {
	console.log('Server running...');
});

