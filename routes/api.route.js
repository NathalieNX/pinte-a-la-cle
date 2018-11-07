
var express = require('express');

var router = express.Router();
var items = require('./api/items.route');
var itemsLost = require('./api/itemsLost.route');

router.use('/items', items);
router.use('/itemsLost', itemsLost);

module.exports = router;