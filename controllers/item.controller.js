
// controller layer

// Accessing the Service that we just created
var ItemService = require('../services/item.service')
// Saving the context of this module inside the _this variable
_this = this

// Async Controller function to get the Item List
exports.getItems = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var items = await ItemService.getItems({}, page, limit)
        // Return the todos list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: items, message: "Succesfully Recieved Items"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createItem = async function(req, res, next){
    // Req.Body contains the form submit values.
    // TODO use item class ?
    var item = {
        id : req.body.id,
        title : req.body.title,
        photo : req.body.photo,
        contact : req.body.contact,
        description : req.body.description,
        date : req.body.date,
        user : req.body.user
    }
    try{   
        // Calling the Service function with the new object from the Request Body
        var createdItem = await ItemService.createItem(item)
        return res.status(201).json({status: 201, data: createdItem, message: "Succesfully Created Item"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Item Creation was Unsuccesfull"})
    }
}

exports.updateItem = async function(req, res, next){
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }
    var id = req.body._id;
    console.log(req.body)
    var item = {
        id,
        title : req.body.title ? req.body.title : null,
        photo : req.body.photo ? req.body.photo : null,
        contact : req.body.contact ? req.body.contact : null,
        description : req.body.description ? req.body.description : null,
        date : req.body.date ? req.body.date : null,
        user : req.body.user ? req.body.user : null,
    }
    try{
        var updatedItem = await ItemService.updateItem(item)
        return res.status(200).json({status: 200, data: updatedItem, message: "Succesfully Updated Item"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeItem = async function(req, res, next){
    var id = req.params.id;
    try{
        var deleted = await ItemService.deleteItem(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Item"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}