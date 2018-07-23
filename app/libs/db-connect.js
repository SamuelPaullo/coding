var mongoose = require('mongoose'),
	env_url = {
		"development": "mongodb://localhost:27017/coding_test" ,
		"production": "mongodb://localhost:27017/coding"
	}
;

module.exports = function() {
	var url = env_url[process.env.NODE_ENV || 'development'];
	global.db = (global.db ? global.db : mongoose.createConnection(
			url, 
			{useNewUrlParser: true}
		)
	);
	global.mongoose = mongoose;
	global.Schema = mongoose.Schema;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
		console.log('connection db sucessful');
	});
}