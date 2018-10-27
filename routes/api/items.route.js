
// API layer

var express = require('express')
var router = express.Router()

// Getting the Todo Controller that we just created
var ItemController = require('../../controllers/item.controller');

// Map each API to the Controller Functions
router.get('/', ToDoController.getItem)
router.post('/', ToDoController.createItem)
router.put('/', ToDoController.updateItem)
router.delete('/:id',ToDoController.removeItem)


// Export the Router
module.exports = router;