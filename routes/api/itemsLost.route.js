
// API layer

var express = require('express');
var router = express.Router();

// Getting the Item Controller that we just created
var ItemController = require('../../controllers/item.controller');

// Map each API to the Controller Functions
router.get('/', ItemController.getItemsLost);
router.get('/:id', ItemController.getItemLost);
router.post('/', ItemController.createItemLost);
router.put('/', ItemController.updateItemLost);
router.delete('/:id', ItemController.removeItemLost);


// Export the Router
module.exports = router;