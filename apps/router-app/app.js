// Express Routing app

var express = require('express'),
	app = express();

require('./router')(app);

app.listen(8000, function() {
	console.log('Server running...');
});

