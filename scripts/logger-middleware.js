// Custom logger middleware

module.exports = function(req, res, next) {
	var startTime = +new Date(), // Calculate request start time
		requestMethod = req.method, // Get request HTTP method
		requestUrl = req.url, // Get request url
		stream = process.stdout; // Set standard output stream

	req.on('end', function() {
		var processingTime = +new Date() - startTime; // Calculate request processing time

		// Write request log to output stream
		stream.write(requestUrl + ' (' + requestMethod.toUpperCase() + ')' + '\n' + 'Processing time : '+ processingTime + 'ms \n\n');
	});

	next();
};