var bluebird = require('bluebird')

var index = require('./routes/index.route');
var users = require('./routes/users.route');

// Get the API route ...
var api = require('./routes/api.route')

//Use the Routes
app.use('/', index);
app.use('/users', users);

//Use the API routes for all routes matching /api
app.use('/api', api);

var mongoose = require('mongoose')
mongoose.Promise = bluebird
mongoose.connect('mongodb://127.0.0.1:27017/pinte-a-la-cle', { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/pinte-a-la-cle`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/pinte-a-la-cle`)})

/* Frontend Application will be on http://localhost:4200, which is different origin from http://localhost:3000. 
 * That’s why the CORS policy of Browsers blocks these kinds of request.
 * We need to allow these kinds of requests from the Backend’s preflight response. */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });