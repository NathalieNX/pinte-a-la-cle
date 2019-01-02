
// service layer

// Getting the Newly created Mongoose Model we just created 
var Item = require('../models/item.model');
var ItemLost = require('../models/itemLost.model');
var ItemFound = require('../models/itemFound.model');

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

exports.getItemsLost = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    } 
    // Try Catch the awaited promise to handle the error   
    try {
        //TODO delete this
        console.log("ItemService.js - trying to get lost items");
        var itemsLost = await ItemLost.paginate(query, options);
        // Return the item list that was returned by the mongoose promise
        return itemsLost;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Lost Items');
    }
}

exports.getItemsFound = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error   
    try {
        var itemsFound = await ItemFound.paginate(query, options);
        // Return the item list that was returned by the mongoose promise
        return itemsFound;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Found Items');
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

exports.getItemLost = async function(itemLost){
    var id = itemLost.id;
    try{
        console.log("Service - trying to get lost item by id...");
        //Find the old Item Object by the Id
        var wantedItemLost = await ItemLost.findById(id);
        console.log("Service - ...got lost item by id.");
    }catch(e){
        throw Error("Error occured while Finding the lost Item");
    }
    // If no old Item Object exists return false
    if(!wantedItemLost){
        return false;
    }
}

exports.getItemFound = async function(itemFound){
    var id = itemFound.id;
    try{
        console.log("Service - trying to get lost item by id...");
        //Find the old Item Object by the Id
        var wantedItemFound = await ItemFound.findById(id);
        console.log("Service - ...got lost item by id.");
    }catch(e){
        throw Error("Error occured while Finding the lost Item");
    }
    // If no old Item Object exists return false
    if(!wantedItemFound){
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

exports.createItemLost = async function(itemLost){
    // Creating a new Mongoose Object by using the new keyword
    var newItemLost = new ItemLost({
        id : itemLost.id,
        title : itemLost.title,
        photo : itemLost.photo,
        contact : itemLost.contact,
        description : itemLost.description,
        date : itemLost.date,
        user : itemLost.user,
        palc : itemLost.palc,
    })
    console.log("Service - trying to create lost item");
    try{
        // Saving the Item 
        // TODO del
        console.log("Service - trying to get lost item to save...");
        var savedItemLost = await newItemLost.save();
        // TODO del
        console.log("Service - ...got lost item to save");
        return savedItemLost;
    }catch(e){
        // TODO del
        console.log(e);
        console.log("Service - failed at saving lost item");
        // return a Error message describing the reason     
        throw Error("Error while Creating Lost Item");
    }
}

exports.createItemFound = async function(itemFound){
    // Creating a new Mongoose Object by using the new keyword
    var newItemFound = new ItemFound({
        id : itemFound.id,
        title : itemFound.title,
        photo : itemFound.photo,
        contact : itemFound.contact,
        description : itemFound.description,
        date : itemFound.date,
        user : itemFound.user,
    })
    console.log("Service - trying to create lost item");
    try{
        // Saving the Item 
        // TODO del
        console.log("Service - trying to get lost item to save...");
        var savedItemFound = await newItemFound.save();
        // TODO del
        console.log("Service - ...got lost item to save");
        return savedItemFound;
    }catch(e){
        // TODO del
        console.log(e);
        console.log("Service - failed at saving lost item");
        // return a Error message describing the reason     
        throw Error("Error while Creating Found Item");
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

exports.updateItemLost = async function(itemLost){
    var id = itemLost.id;
    try{
        //Find the old Lost Item Object by the Id
        console.log("Service - trying to find lost item to update by id ...");
        var oldItemLost = await ItemLost.findById(id);
        console.log("Service - ... found lost item to update by id.");
    }catch(e){
        throw Error("Error occured while Finding the lost Item");
    }
    // If no old Lost Item Object exists return false
    if(!oldItemLost){
        return false;
    }
    console.log("old lost item :", oldItemLost)
    //Edit the Item Object
    oldItemLost.id = itemLost.id,
    oldItemLost.title = itemLost.title,
    oldItemLost.photo = itemLost.photo,
    oldItemLost.contact = itemLost.contact,
    oldItemLost.description = itemLost.description,
    oldItemLost.date = itemLost.date,
    oldItemLost.user = itemLost.user,
    oldItemLost.palc = itemLost.palc,
    console.log("becomes : ", oldItemLost);

    try{
        console.log("Service - trying to save...");
        //Find the old Lost Item Object by the Id
        var savedItemLost = await ItemLost.replaceOne({_id:id}, oldItemLost);
        console.log("Service - ...saved Lost item.");
        return savedItemLost;
    }catch(e){
        console.log(e);
        throw Error("Error occured while saving the Lost Item");
    }
}

exports.updateItemFound = async function(itemFound){
    var id = itemFound.id;
    try{
        //Find the old Found Item Object by the Id
        console.log("Service - trying to find lost item to update by id ...");
        var oldItemFound = await ItemFound.findById(id);
        console.log("Service - ... found lost item to update by id.");
    }catch(e){
        throw Error("Error occured while Finding the lost Item");
    }
    // If no old Found Item Object exists return false
    if(!oldItemFound){
        return false;
    }
    console.log("old lost item :", oldItemFound)
    //Edit the Item Object
    oldItemFound.id = itemFound.id,
    oldItemFound.title = itemFound.title,
    oldItemFound.photo = itemFound.photo,
    oldItemFound.contact = itemFound.contact,
    oldItemFound.description = itemFound.description,
    oldItemFound.date = itemFound.date,
    oldItemFound.user = itemFound.user,
    console.log("becomes : ", oldItemFound);

    try{
        console.log("Service - trying to save...");
        //Find the old Found Item Object by the Id
        var savedItemFound = await ItemFound.replaceOne({_id:id}, oldItemFound);
        console.log("Service - ...saved Found item.");
        return savedItemFound;
    }catch(e){
        console.log(e);
        throw Error("Error occured while saving the Found Item");
    }
}


exports.deleteItemLost = async function(id){
    // Delete the item
    try{
        console.log("Service - trying to delete lost item ...");
        console.log(id);
        var deleted = await ItemLost.remove({_id:id});
        console.log("Service - ... got lost item to delete");
        if(deleted.n === 0){
            return ("Service - could not delete lost item")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Lost Item");
    }
}

exports.deleteItemFound = async function(id){
    // Delete the item
    try{
        console.log("Service - trying to delete lost item ...");
        console.log(id);
        var deleted = await ItemFound.remove({_id:id});
        console.log("Service - ... got lost item to delete");
        if(deleted.n === 0){
            return ("Service - could not delete lost item")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the Found Item");
    }
}
