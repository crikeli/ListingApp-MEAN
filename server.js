// The server file is bound to be fairly simple because
// this app only allows for fairly simple processes
// Namely ~ Creating a listing, having them displayed in a "gallery"
// and viewing the details of one particular listing.

var express = require('express');
var mongoose = require('mongoose');
var port = 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

var listing = require('./app/routes/listing')();

// The following are a few options required to create a connection
// to the database.

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    }
};
mongoose.connect('mongodb://file:file123@ds047438.mlab.com:47438/file_picker_mean', options);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// I am using the morgan module to simulate a loged in user
app.use(morgan('dev'));

// bodyParser parses the client requests as JSON format to store a listing.
// I then parse through the application/json (body-parser) to look for raw text                                      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

// The following are the static files used to generate content and connect routes.
app.use(express.static(__dirname + '/public'));

app.route('/listing')
// Will create  a new listing 
.post(listing.post)
// Will get all the current listings
.get(listing.getAll);

app.route('/listing/:id')
// Will retrieve an individual listing depending on its id
.get(listing.getOne);

app.listen(port);
console.log('listening on port ' + port);