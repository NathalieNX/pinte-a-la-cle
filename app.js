var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan'); 
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var passport = require('passport');

// Require the routes ...
var api = require('./routes/api.route');
var index = require('./routes/index.route');

var app = express();

// SETTING UP THE MONGODB CONNECTION

var bluebird = require('bluebird')
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var logger = require('morgan');

mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/palcdb', { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/palcdb`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/palcdb`)})

// CORS POLICY

/* Frontend Application will be on http://localhost:4200, which is different origin from http://localhost:3000. 
 * That’s why the CORS policy of Browsers blocks these kinds of request.
 * We need to allow these kinds of requests from the Backend’s preflight response. */

 /*
var corsOptions = {
  "origin": "http://localhost:4200",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// added for images
//app.use(express.static('public'));

// require config and use passport
require('./config/passport');
app.use(passport.initialize());

// use for images
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the Routes - ex : Use the API routes for all routes matching /api
app.use('/', index);
app.use('/api', api);



module.exports = app;

// Error handling

app.use(function (err, req, res, next) {
  // Auth error
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + " : " + err.message});
  }
});