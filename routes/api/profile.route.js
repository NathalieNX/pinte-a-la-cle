// API layer

var express = require('express');
var router = express.Router();

// Getting the Item Controller that we just created
var AuthenticationController = require('../../controllers/authentication.controller');

// Map each API to the Controller Functions
router.get('/', AuthenticationController.profileRead);


// Export the Router
module.exports = router;