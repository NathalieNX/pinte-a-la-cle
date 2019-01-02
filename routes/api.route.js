
var express = require('express');

var router = express.Router();
var items = require('./api/items.route');
var itemsLost = require('./api/itemsLost.route');
var itemsFound = require('./api/itemsFound.route');


router.use('/items', items);
router.use('/items-lost', itemsLost);
router.use('/items-found', itemsFound);

module.exports = router;