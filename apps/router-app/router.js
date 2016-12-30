// Router module

var userController = require('./user-controller'),
	dataController = require('./data-controller');

module.exports = function(app) {
	app.use('/user', function(req, res, next) {
		next();
	}, userController);

	app.use('/data', function(req, res, next) {
		next();
	}, dataController);
};