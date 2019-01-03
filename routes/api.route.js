
var express = require('express');

var router = express.Router();
var items = require('./api/items.route');
var itemsLost = require('./api/itemsLost.route');
var itemsFound = require('./api/itemsFound.route');
var uploads = require('./api/uploads.route');
var users = require('./api/users.route');
var register = require('./api/register.route');
var login = require('./api/login.route');


router.use('/items', items);
router.use('/items-lost', itemsLost);
router.use('/items-found', itemsFound);
router.use('/new-upload', uploads);
router.use('/users', users);
router.use('/register', register);
router.use('/login', login);

module.exports = router;