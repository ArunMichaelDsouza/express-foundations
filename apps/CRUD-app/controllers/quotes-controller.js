// Quotes controller

var router = require('express').Router();

router
	.get('/', function(req, res) {
		res.send('quotes');
	})

module.exports = router;