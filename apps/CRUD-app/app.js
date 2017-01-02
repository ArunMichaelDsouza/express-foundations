// Quotes CRUD app

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));

require('./router')(app);

app.listen(8000, function() {
	console.log('Server running...');
});