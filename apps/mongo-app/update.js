// Mongo read queries

var MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    app = express(),
    DB;

// Database connection
console.log('Connecting to database...');
MongoClient.connect('mongodb://localhost:27017/movies')
    .then(function(db) {
        DB = db;
        console.log('Connected to database!');

        app.listen(8000, function() {
            console.log('Server running...');
        });
    })
    .catch(function() {
        console.log('Some error occurred');
    });

// Data update queries
app.get('/updateOne', function(req, res) {
    return DB.collection('list').updateOne({
            "Title": "Iron Man"
        }, {
            $set: { "Director": "Arun" }
        })
        .then(function(result) {
            res.send(result);
        })
        .catch(function() {
            res.send('Data not found!');
        });
});

app.get('/pushOne', function(req, res) {
    return DB.collection('list').updateOne({
            "Title": "The Avengers"
        }, {
            $push: { "Genre": { "$each": ["Adventure"], "$position": 2, "$slice": 1 } }
        })
        .then(function(result) {
            res.send(result);
        })
        .catch(function() {
            res.send('Data not found!');
        });
});

app.get('/updateMany', function(req, res) {
    return DB.collection('list').updateMany({
            "$where": "this.Genre.length > 2"
    }, {
        "$set": {
            "myRating": 100 // set
        }
        // {
        //     "$unset": {
        //         "myRating": "" // unset
        //     }
        // }
    })
    .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            console.log(err);
            res.send('Data not found!');
        });
});

var obj = {
    _id: 123,
    "Title": "test"
};

app.get('/upsert', function(req, res) {
    return DB.collection('list').updateOne({
            "_id": obj._id
        }, {
            "$set": { "Title": obj.Title }
        }, {
            "upsert": true
        })
        .then(function(result) {
            res.send(result);
        })
        .catch(function() {
            res.send('Data not found!');
        });
});


var newObj = {
    "Title": "test2"
};
app.get('/replaceOne', function(req, res) {
    return DB.collection('list').replaceOne({
            "_id": 123
        }, newObj)
        .then(function(result) {
            res.send(result);
        })
        .catch(function() {
            res.send('Data not found!');
        });
});


