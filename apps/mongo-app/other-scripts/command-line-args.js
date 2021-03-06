// Command line args for mongo queries

var MongoClient = require('mongodb').MongoClient,
    commandLineArgs = require('command-line-args'),
    commandLineUsage = require('command-line-usage');

// Generate cli help usage template
function generateCliUsageTemplate() {
    var templ = [{
        header: 'Mongo query using Command line arguments',
        content: 'Define a query using the CLI for fetching data from mongodb'
    }, {
        header: 'Options',
        optionList: [{
            name: 'firstYear',
            typeLabel: '[underline]{Number} [underline]{required} (alias: -f)',
        }, {
            name: 'lastYear',
            typeLabel: '[underline]{Number} [underline]{required} (alias: -l)',
        }, {
            name: 'employees',
            typeLabel: '[underline]{Number} (alias: -e)',
        }, {
            name: 'skip',
            typeLabel: '[underline]{Number} (alias: -s)',
        }, {
            name: 'limit',
            typeLabel: '[underline]{Number} (alias: -l)',
        }]
    }];

    return templ;
};

// Request data from database
function getData(query, skip, limit) {
    return MongoClient.connect('mongodb://localhost:27017/crunchbase')
        .then(function(db) {
            return db.collection('companies').find(query, {
                '_id': 0,
                'name': 1,
                'founded_year': 1
            }).sort({'founded_year': 1}).skip(skip).limit(limit);
        })
        .then(function(cursor) {
            var i = 0;
            cursor.forEach(function(doc) {
                console.log(doc);
                i++;
            }, function(err) {
                console.log('Docs found - '+i);
            })
        })
        .catch(function(err) {
            console.log('Some error occurred!');
        });
};

// Generate mongo query using provided command line arguments
function generateMongoQuery(firstYear, lastYear, employees, skip, limit) {
    var query = {
        'founded_year': {
            '$gte': firstYear,
            '$lte': lastYear
        }
    }
    if (employees) {
       query.number_of_employees = { '$lt': employees };
    } 

    getData(query, skip, limit);
};

// Initialise cli app
function initCliScript() {
    var cli = commandLineArgs([
        { name: "firstYear", alias: "f", type: Number },
        { name: "lastYear", alias: "l", type: Number },
        { name: "employees", alias: "e", type: Number },
        { name: "skip", alias: "s", type: Number },
        { name: "limit", alias: "i", type: Number }
    ]);

    if (('firstYear' in cli) && ('lastYear' in cli)) {
        var firstYear = parseInt(cli.firstYear, 10),
            lastYear = parseInt(cli.lastYear, 10),
            employees = parseInt(cli.employees, 10),
            skip = parseInt(cli.skip, 10),
            limit = parseInt(cli.limit, 10),
            query;

        generateMongoQuery(firstYear, lastYear, employees, skip, limit);

    } else {
        var cliHelp = commandLineUsage(generateCliUsageTemplate());
        console.log(cliHelp);
    }
};

initCliScript();
