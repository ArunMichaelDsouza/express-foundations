// Router module

var userController = require('./user-controller'),
	dataController = require('./data-controller');

module.exports = function(app) {
	app.use('/user', userController);

	app.use('/data', dataController);
};