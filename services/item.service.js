
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
    try{
        // Saving the Item 
        var savedItem = await newItem.save();
        return savedItem;
    }catch(e){
        // return a Error message describing the reason     
        throw Error("Error while Creating Item");
    }
}

exports.updateItem = async function(item){
    var id = item.id;
    try{
        //Find the old Item Object by the Id
        var oldItem = await Item.findById(id);
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
    console.log("becomes : ", oldItem)
    try{
        var savedItem = await oldItem.save();
        return savedItem;
    }catch(e){
        throw Error("And Error occured while updating the Item");
    }
}

exports.deleteItem = async function(id){
    // Delete the item
    try{
        var deleted = await Item.remove({_id: id});
        if(deleted.result.n === 0){
            throw Error("Item Could not be deleted");
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Item");
    }
}
