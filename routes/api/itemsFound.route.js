
// API layer

var express = require('express');
var router = express.Router();

// Getting the Item Controller that we just created
var ItemController = require('../../controllers/item.controller');

// Map each API to the Controller Functions
router.get('/', ItemController.getItemsFound);
router.get('/:id', ItemController.getItemFound);
router.post('/', ItemController.createItemFound);
router.put('/', ItemController.updateItemFound);
router.delete('/:id', ItemController.removeItemFound);


// Export the Router
module.exports = router;