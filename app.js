var express = require('express'),
	app = express();

app.get('/', function(req, res) {
	res.send('Root route');

	/* Equivalent to -
		res.write('Root route!');
		res.end(); 
	*/
});

// Automatic data serialization
app.get('/data', function(req, res) {
	res.json([1,2,3]);
	// res.send({id: 11}); // Same as res.json({id: 11})
	// res.send('<h1>Text</h1>');
	// res.json('<h1>Text</h1>') // converts this to json string
});

// Route redirection
app.get('/blog', function(req, res) {
	res.redirect('/newBlog');
});

app.get('/newBlog', function(req, res) {
	res.send('New blog');
})

app.listen(8000, function() {
	console.log('Server running...');
});