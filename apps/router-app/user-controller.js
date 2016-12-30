// User controller 

var express = require('express'),
	router = express.Router();

router
	.get('/', function(req, res) {
		res.status(200).send({'username': 'amd'});
	})
	.post('/setUserName', function(req, res) {
		res.status(200).send({'username': 'amd2'});
	});

module.exports = router;