
// controller layer

// Accessing the Service that we just created
var ItemService = require('../services/item.service');
var Item = require('../models/item.model');
var ItemLost = require('../models/itemLost.model');
var ItemFound = require('../models/itemFound.model');

// Saving the context of this module inside the _this variable
_this = this;

// Async Controller function to get the Item List

exports.getItems = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var items = await ItemService.getItems({}, page, limit)
        // Return the itemss list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: items, message: "Succesfully Recieved Items"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getItemsLost = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var itemsLost = await ItemService.getItemsLost({}, page, limit)
        // Return the items list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: itemsLost, message: "Succesfully Recieved Lost Items"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getItemsFound = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var itemsFound = await ItemService.getItemsFound({}, page, limit)
        // Return the items list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: itemsFound, message: "Succesfully Recieved Found Items"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the Item by id

exports.getItem = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    var query = Item.findOne({_id:id});
    query.exec(
        function(err, item){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get item"});
            }
            return res.status(200).json({status: 200, data: item, message: `Controller - Succesfully got Item id=${id}`});
        }
    )
}

exports.getItemLost = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    var query = ItemLost.findOne({_id:id});
    query.exec(
        function(err, itemLost){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get Lost item"});
            }
            return res.status(200).json({status: 200, data: itemLost, message: `Controller - Succesfully got lost Item id=${id}`});
        }
    )
}

exports.getItemFound = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    var query = ItemFound.findOne({_id:id});
    query.exec(
        function(err, itemFound){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get Found item"});
            }
            return res.status(200).json({status: 200, data: itemFound, message: `Controller - Succesfully got lost Item id=${id}`});
        }
    )
}

// Async Controller function to add new Item 

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

exports.createItemLost = async function(req, res, next){
    // Req.Body contains the form submit values.
    // TODO use item class ?
    var itemLost = {
        id : req.body.id,
        title : req.body.title,
        photo : req.body.photo,
        contact : req.body.contact,
        description : req.body.description,
        date : req.body.date,
        user : req.body.user,
        palc : req.body.palc
    }
    try{   
        // Calling the Service function with the new object from the Request Body
        var createdItemLost = await ItemService.createItemLost(itemLost)
        return res.status(201).json({status: 201, data: createdItemLost, message: "Controller - Succesfully Created Lost Item"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Controller - Lost Item Creation was Unsuccesfull"})
    }
}

exports.createItemFound = async function(req, res, next){
    // Req.Body contains the form submit values.
    // TODO use item class ?
    var itemFound = {
        id : req.body.id,
        title : req.body.title,
        photo : req.body.photo,
        contact : req.body.contact,
        description : req.body.description,
        date : req.body.date,
        user : req.body.user,
        palc : req.body.palc
    }
    try{   
        // Calling the Service function with the new object from the Request Body
        var createdItemFound = await ItemService.createItemFound(itemFound)
        return res.status(201).json({status: 201, data: createdItemFound, message: "Controller - Succesfully Created Found Item"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Controller - Found Item Creation was Unsuccesfull"})
    }
}

// Async Controller function to modify existing Item 

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

exports.updateItemLost = async function(req, res, next){
    console.log(req.body);
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to update Lost Item"})
    }
    var id = req.body._id;
    console.log("req.body : ", req.body);
    var itemLost = {
        id,
        title : req.body.title ? req.body.title : null,
        photo : req.body.photo ? req.body.photo : null,
        contact : req.body.contact ? req.body.contact : null,
        description : req.body.description ? req.body.description : null,
        date : req.body.date ? req.body.date : null,
        user : req.body.user ? req.body.user : null,
        palc : req.body.palc ? req.body.palc : null,
    }
    try{
        var updatedItemLost = await ItemService.updateItemLost(itemLost)
        return res.status(200).json({status: 200, data: updatedItemLost, message: "Controller - Succesfully Updated Lost Item"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}

exports.updateItemFound = async function(req, res, next){
    console.log(req.body);
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to update Found Item"})
    }
    var id = req.body._id;
    console.log("req.body : ", req.body);
    var itemFound = {
        id,
        title : req.body.title ? req.body.title : null,
        photo : req.body.photo ? req.body.photo : null,
        contact : req.body.contact ? req.body.contact : null,
        description : req.body.description ? req.body.description : null,
        date : req.body.date ? req.body.date : null,
        user : req.body.user ? req.body.user : null,
        palc : req.body.palc ? req.body.palc : null,
    }
    try{
        var updatedItemFound = await ItemService.updateItemFound(itemFound)
        return res.status(200).json({status: 200, data: updatedItemFound, message: "Controller - Succesfully Updated Found Item"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}

// Async Controller function to remove Item by id

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

exports.removeItemLost = async function(req, res, next){
    var id = req.params.id;
    console.log(`Controller - id is ${id}`)
    try{
        var deleted = await ItemService.deleteItemLost(id)
        console.log("Controller - got deleted lost item :", deleted);
        return res.status(204).json({status:204, data: deleted, message: "Controller - Succesfully Deleted Lost Item"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.removeItemFound = async function(req, res, next){
    var id = req.params.id;
    console.log(`Controller - id is ${id}`)
    try{
        var deleted = await ItemService.deleteItemFound(id)
        console.log("Controller - got deleted lost item :", deleted);
        return res.status(204).json({status:204, data: deleted, message: "Controller - Succesfully Deleted Found Item"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}