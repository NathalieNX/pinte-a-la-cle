
// API layer

var express = require('express');
var router = express.Router();

// Getting the Item Controller that we just created
var ItemController = require('../../controllers/item.controller');

// Map each API to the Controller Functions
router.get('/', ItemController.getItems);
router.post('/', ItemController.createItem);
router.put('/', ItemController.updateItem);
router.delete('/:id', ItemController.removeItem);


// Export the Router
module.exports = router;