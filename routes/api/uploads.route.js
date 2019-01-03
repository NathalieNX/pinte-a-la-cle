var express = require('express');
var router = express.Router();
//var fs = require('fs');
//var Upload = require('../models/upload');
const multer = require('multer');
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
    });
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
    });

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, PICTURE_FOLDER));
    },
    filename: function(req, file, cb){
        var filename = Date.now();
        switch (file.mimetype) {
            case 'image/png':
            filename = filename + ".png";
            break;
            case 'image/jpeg':
            filename = filename + ".jpeg";
            break;
            default:
            break;
        }
        cb(null, filename);
    }
});
var parser = multer({ storage: storage});

var UploadController = require('../../controllers/upload.controller');


/**
 * Create's the file in the database
 */
router.get('/', UploadController.getUploads);
//TODO change id for filename !!!
router.get('/:id', UploadController.getIUpload);
router.post('/', parser.single('file'), UploadController.createUpload);
router.put('/', UploadController.updateUpload);
router.delete('/:id', UploadController.removeIUpload);
module.exports = router;