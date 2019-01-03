
// controller layer

// Accessing the Service
var UploadService = require('../services/upload.service');
var Upload = require('../models/upload.model');
// Saving the context of this module inside the _this variable
_this = this;

// Async Controller function to get the Upload List
exports.getUploads = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var uploads = await UploadService.getUploads({}, page, limit)
        // Return the list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: uploads, message: "Succesfully Recieved Uploads"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the Upload 
exports.getUpload = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    var query = Upload.findOne({_id:id});
    query.exec(
        function(err, upload){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get upload"});
            }
            return res.status(200).json({status: 200, data: upload, message: `Controller - Succesfully got Upload id=${id}`});
        }
    )
}

exports.createUpload = async function(req, res, next){
    // Req.Body contains the form submit values.
    // TODO use upload class ?
    console.log(req.file);
    var upload = {
        name: req.body.name,
        created: Date.now(),
        url: req.file.url,
        file: __dirname + '/' + req.file
    }
    console.log("uploadController - upload is : ", upload);
    try{   
        // Calling the Service function with the new object from the Request Body
        //var createdUpload = await UploadService.createUpload(upload)
        //return res.status(201).json({status: 201, data: createdUpload, message: "Controller - Succesfully Created Upload"})
        Image.create(image) // save image information in database
            .then(newImage => res.json(newImage))
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Controller - Upload Creation was Unsuccesfull"})
    }
}

exports.updateUpload = async function(req, res, next){
    console.log(req.body);
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to update"})
    }
    var id = req.body._id;
    console.log("req.body : ", req.body);
    var upload = {
        id,
        name : req.body.name ? req.body.name : null,
        created : req.body.created ? req.body.created : null,
        url : req.file.url ? req.file : null,
        file : req.file ? req.file : null,
    }
    try{
        var updatedUpload = await UploadService.updateUpload(upload)
        return res.status(200).json({status: 200, data: updatedUpload, message: "Controller - Succesfully Updated Upload"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}

exports.removeUpload = async function(req, res, next){
    var id = req.params.id;
    console.log(`Controller - id is ${id}`)
    try{
        var deleted = await UploadService.deleteUpload(id)
        console.log("Controller - got deleted upload :", deleted);
        return res.status(204).json({status:204, data: deleted, message: "Controller - Succesfully Deleted Upload"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}