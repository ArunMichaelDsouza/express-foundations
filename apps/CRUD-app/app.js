// Quotes CRUD app

var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    MongoClient = require('mongodb').MongoClient,
    database = {
        username: 'admin',
        password: '123456',
        url: '@ds011830.mlab.com:11830/amd-quotes-app'
    },
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var dbUrl = 'mongodb://' + database.username + ':' + database.password + database.url,
    DB;

console.log('Connecting to Database...');
MongoClient.connect(dbUrl, function(err, db) {
    if (err) {
        console.log('Cannot connect to Database...');
        console.log(err);
        return;
    }

    DB = db;

    app.listen(8000, function() {
        console.log('Database connected!');
    });
});

app.get('/', function(req, res) {
    res.redirect('/quotes');
});

app.get('/quotes', function(req, res) {
    res.sendFile('index.html');
});

app.post('/createQuote', function(req, res) {
    console.log(req.body);
});
