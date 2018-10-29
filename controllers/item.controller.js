
// controller layer

// Accessing the Service that we just created
var ItemService = require('../services/item.service');
var Item = require('../models/item.model');
// Saving the context of this module inside the _this variable
_this = this;

// Async Controller function to get the Item List
exports.getItems = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
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

// Async Controller function to get the Item 
exports.getItem = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    /*
    // console.log(req.path.split("/").slice(-1)[0]);
    var id = req.path.split("/").slice(-1)[0]; 
    if(!id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to get"})
    }
    
    
    if(!req.body.id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to get"})
    }
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
        var wantedItem = await ItemService.getItem(item)
        return res.status(200).json({status: 200, data: wantedItem, message: `Controller - Succesfully got Item id=${id}`})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
    */
    var query = Item.findOne({_id:id});
    query.exec(
        function(err, item){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get"});
            }
            return res.status(200).json({status: 200, data: item, message: `Controller - Succesfully got Item id=${id}`});
        }
    )
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
        return res.status(201).json({status: 201, data: createdItem, message: "Controller - Succesfully Created Item"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Controller - Item Creation was Unsuccesfull"})
    }
}

exports.updateItem = async function(req, res, next){
    console.log(req.body);
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to update"})
    }
    var id = req.body._id;
    console.log("req.body : ", req.body);
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
        return res.status(200).json({status: 200, data: updatedItem, message: "Controller - Succesfully Updated Item"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}

exports.removeItem = async function(req, res, next){
    var id = req.params.id;
    console.log(`Controller - id is ${id}`)
    try{
        var deleted = await ItemService.deleteItem(id)
        console.log("Controller - got deleted item :", deleted);
        return res.status(204).json({status:204, data: deleted, message: "Controller - Succesfully Deleted Item"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}