// Data controller 

var express = require('express'),
	router = express.Router();

router
	.get('/', function(req, res) {
		res.status(200).send({'data': {id: 12}});
	})
	.post('/setData', function(req, res) {
		res.status(200).send({'data': {id: 122}});
	});

module.exports = router;