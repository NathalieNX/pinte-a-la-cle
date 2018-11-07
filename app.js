var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan'); 
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var bluebird = require('bluebird')
var mongoose = require('mongoose')

var index = require('./routes/index.route');
var users = require('./routes/users.route');

// Get the API route ...
var api = require('./routes/api.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Use the Routes
app.use('/', index);
app.use('/users', users);
//Use the API routes for all routes matching /api
app.use('/api', api);

module.exports = app;

mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/palcdb', { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/palcdb`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/palcdb`)})

/* Frontend Application will be on http://localhost:4200, which is different origin from http://localhost:3000. 
 * That’s why the CORS policy of Browsers blocks these kinds of request.
 * We need to allow these kinds of requests from the Backend’s preflight response. */

var corsOptions = {
  "origin": "http://localhost:4200",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
*/