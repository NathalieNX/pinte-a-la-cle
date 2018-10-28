
var express = require('express');

var router = express.Router();
var items = require('./api/items.route');

router.use('/items', items);

module.exports = router;