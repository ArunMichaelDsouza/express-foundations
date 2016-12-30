// Route params implementation

var express = require('express'),
	app = express();

// Param middleware to access route params
app.param('id', function(req, res, next) {
	req.id = parseInt(req.params.id, 10) + 1;
	next();
});

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
		2: 'This is id 1',
		3: 'This is id 2',
		4: 'This is id 3'
	}, resData = {};

	// Accessing request route params set in param middleware
	if(ids[req.id]) {
		resData.status = 200;
		resData.data = ids[req.id];
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