// Route params implementation

var express = require('express'),
	app = express();

app.get('/getData', function(req, res) {
	var arr = [1,2,3,4,5,6,7];

	// Accessing request query param
	if(req.query.limit > 0) {
		res.json(arr.slice(0, req.query.limit));
	}
	else {
		res.json(arr);
	}
});

app.get('/getId/:id', function(req, res) {
	var ids = {
		1: 'This is id 1',
		2: 'This is id 2',
		3: 'This is id 3'
	}, resData = {};

	// Accessing request route params
	if(ids[req.params.id]) {
		resData.status = 200;
		resData.data = ids[req.params.id];
	}
	else {
		resData.status = 404;
		resData.data = 'Id not found!';
	}

	res.status(resData.status).json(resData.data);
});

app.listen(8000, function() {
	console.log('Server running...');
});