
// service layer

// Getting the Newly created Mongoose Model we just created 
var Item = require('../models/item.model')

// Saving the context of this module inside the _this variable
_this = this

// Async function to get the item List
exports.getItems = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error   
    try {
        var items = await Item.paginate(query, options);
        // Return the item list that was returned by the mongoose promise
        return items;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Items');
    }
}

// Async function to get the item
exports.getItem = async function(item){
    var id = item.id;
    try{
        console.log("Service - trying to get item by id...");
        //Find the old Item Object by the Id
        var wantedItem = await Item.findById(id);
        console.log("Service - ...got item by id.");
    }catch(e){
        throw Error("Error occured while Finding the Item");
    }
    // If no old Item Object exists return false
    if(!wantedItem){
        return false;
    }
}

exports.createItem = async function(item){
    // Creating a new Mongoose Object by using the new keyword
    var newItem = new Item({
        id : item.id,
        title : item.title,
        photo : item.photo,
        contact : item.contact,
        description : item.description,
        date : item.date,
        user : item.user,
    })
    console.log("Service - trying to create item");
    try{
        // Saving the Item 
        // TODO del
        console.log("Service - trying to get item to save...");
        var savedItem = await newItem.save();
        // TODO del
        console.log("Service - ...got item to save");
        return savedItem;
    }catch(e){
        // TODO del
        console.log(e);
        console.log("Service - failed at saving item");
        // return a Error message describing the reason     
        throw Error("Error while Creating Item");
    }
}

exports.updateItem = async function(item){
    var id = item.id;
    try{
        //Find the old Item Object by the Id
        console.log("Service - trying to find item to update by id ...");
        var oldItem = await Item.findById(id);
        console.log("Service - ... found item to update by id.");
    }catch(e){
        throw Error("Error occured while Finding the Item");
    }
    // If no old Item Object exists return false
    if(!oldItem){
        return false;
    }
    console.log("old item :", oldItem)
    //Edit the Item Object
    oldItem.id = item.id,
    oldItem.title = item.title,
    oldItem.photo = item.photo,
    oldItem.contact = item.contact,
    oldItem.description = item.description,
    oldItem.date = item.date,
    oldItem.user = item.user,
    console.log("becomes : ", oldItem);

    try{
        console.log("Service - trying to save...");
        //Find the old Item Object by the Id
        var savedItem = await Item.replaceOne({_id:id}, oldItem);
        console.log("Service - ...saved item.");
        return savedItem;
    }catch(e){
        console.log(e);
        throw Error("Error occured while saving the Item");
    }
    /*
    try{
        console.log("Service - trying to get item to save...");
        var savedItem = await oldItem.save();
        console.log("Service - ...got item to save.");
        return savedItem;
    }catch(e){
        throw Error("And Error occured while updating the Item");
    }
    */
}

exports.deleteItem = async function(id){
    // Delete the item
    try{
        console.log("Service - trying to delete item ...");
        console.log(id);
        var deleted = await Item.remove({_id:id});
        console.log("Service - ... got item to delete");
        if(deleted.n === 0){
            return ("Service - could not delete item")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Item");
    }
}
