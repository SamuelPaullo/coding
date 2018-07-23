var express = require('express'),
	bodyParser = require('body-parser'),
	consign = require('consign'),
	dbConnect = require('../app/libs/db-connect');

dbConnect();

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views'); 

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

module.exports = app;