var express = require('express');
var router = express.Router();
//var fs = require('fs');
//var Upload = require('../models/upload');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var UploadController = require('../../controllers/upload.controller');


/**
 * Create's the file in the database
 */
router.get('/', UploadController.getUploads);
//TODO change id for filename !!!
router.get('/:id', UploadController.getIUpload);
router.post('/', upload.single('file'), UploadController.createUpload);
router.put('/', UploadController.updateUpload);
router.delete('/:id', UploadController.removeIUpload);
module.exports = router;