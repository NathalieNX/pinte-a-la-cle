
// API layer

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

// Getting the User Controller that we just created
var AuthenticationController = require('../../controllers/authentication.controller');

// Map each API to the Controller Functions
router.get('/', UserController.getUsers);
router.get('/profile', auth, AuthenticationController.profileRead);
router.post('/', UserController.createUser);
router.put('/', UserController.updateUser);
router.delete('/:id', UserController.removeUser);


// Export the Router
module.exports = router;