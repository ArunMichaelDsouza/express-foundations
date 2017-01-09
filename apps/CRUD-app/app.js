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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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
    DB.collection('quotes').find().toArray(function(err, result) {
        res.render('index', {
            quotes: result
        });
    });
});

app.post('/createQuote', function(req, res) {
    DB.collection('quotes').insert(req.body, function(err, result) {
    	if(err) {
    		res.send('Some error occurred!');
    	}
    	else {
    		res.redirect('/');
    	}
    });
});

app.post('/updateQuote', function(req, res) {
    var name = req.body.name,
        quote = req.body.updatedQuote;

    DB.collection('quotes')
      .findOneAndUpdate({name: name}, {
        $set: {
            name: name,
            quote: quote
        }
      }, function(err, result) {
            if(err) {
                res.send('Some error occurred!');
            }
            else {
                res.redirect('/');
            }
      })
});













