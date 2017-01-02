// Quotes app router

var quotesController = require('./controllers/quotes-controller');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.redirect('/quotes');
	});

	app.use('/quotes', quotesController);
};