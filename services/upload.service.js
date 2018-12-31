
// service layer

// Getting the Newly created Mongoose Model we just created 
var Upload = require('../models/upload.model');

// Saving the context of this module inside the _this variable
_this = this

// Async function to get the upload List
exports.getUploads = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error   
    try {
        var uploads = await Upload.paginate(query, options);
        // Return the upload list that was returned by the mongoose promise
        return uploads;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Uploads');
    }
}

// Async function to get the upload
exports.getUpload = async function(upload){
    var id = upload.id;
    try{
        console.log("Service - trying to get upload by id...");
        //Find the old Upload Object by the Id
        var wantedUpload = await Upload.findById(id);
        console.log("Service - ...got upload by id.");
    }catch(e){
        throw Error("Error occured while Finding the Upload");
    }
    // If no old Upload Object exists return false
    if(!wantedUpload){
        return false;
    }
}

exports.createUpload = async function(upload){
    // Creating a new Mongoose Object by using the new keyword
    var newUpload = new Upload({
        id : upload.id,
        name : upload.name,
        created : upload.created,
        file : upload.file,
    })
    console.log("Service - trying to create upload");
    try{
        // Saving the Upload 
        // TODO del
        console.log("Service - trying to get upload to save...");
        var savedUpload = await newUpload.save();
        // TODO del
        console.log("Service - ...got upload to save");
        //TODO check https://github.com/NukaPunk/mean-multer-ngf about next line
        //res.send(newUpload);
        return savedUpload;
    }catch(e){
        // TODO del
        console.log(e);
        console.log("Service - failed at saving upload");
        // return a Error message describing the reason     
        throw Error("Error while Creating Upload");
    }
}

exports.updateUpload = async function(upload){
    var id = upload.id;
    try{
        //Find the old Upload Object by the Id
        console.log("Service - trying to find upload to update by id ...");
        var oldUpload = await Upload.findById(id);
        console.log("Service - ... found upload to update by id.");
    }catch(e){
        throw Error("Error occured while Finding the Upload");
    }
    // If no old Upload Object exists return false
    if(!oldUpload){
        return false;
    }
    console.log("old upload :", oldUpload)
    //Edit the Upload Object
    oldUpload.id = upload.id,
    oldUpload.name = upload.name,
    oldUpload.created = upload.created,
    oldUpload.file = upload.file,
    console.log("becomes : ", oldUpload);

    try{
        console.log("Service - trying to save...");
        //Find the old Upload Object by the Id
        var savedUpload = await Upload.replaceOne({_id:id}, oldUpload);
        console.log("Service - ...saved upload.");
        return savedUpload;
    }catch(e){
        console.log(e);
        throw Error("Error occured while saving the Upload");
    }
}

exports.deleteUpload = async function(id){
    // Delete the upload
    try{
        console.log("Service.js - trying to delete upload ...");
        console.log(id);
        var deleted = await Upload.remove({_id:id});
        console.log("Service.js - ... got upload to delete");
        if(deleted.n === 0){
            return ("Service.js - could not delete upload")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Upload");
    }
}
