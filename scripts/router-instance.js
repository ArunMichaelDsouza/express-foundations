// Router instances in express

var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.route('/data')
	.get(function(req, res) {
		res.send({id: 10});
	})
	.post(function(req, res) {
		res.send({id: req.body.id});
	});

app.listen(8000, function() {
	console.log('Server running...');
});