
// service layer

// Getting the Newly created Mongoose Model we just created 
var User = require('../models/user.model');

// Saving the context of this module inside the _this variable
_this = this

// Async function to get the user List
exports.getUsers = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error   
    try {
        var users = await User.paginate(query, options);
        // Return the user list that was returned by the mongoose promise
        return users;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Users');
    }
}

// Async function to get the user
exports.getUser = async function(user){
    var id = user.id;
    try{
        console.log("Service - trying to get user by id...");
        //Find the old User Object by the Id
        var wantedUser = await User.findById(id);
        console.log("Service - ...got user by id.");
    }catch(e){
        throw Error("Error occured while Finding the User");
    }
    // If no old User Object exists return false
    if(!wantedUser){
        return false;
    }
}

exports.createUser = async function(user){
    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User();
    console.log("Service - trying to create user");
    try{
        // Saving the User 
        // TODO del
        console.log("Service - trying to get user to save...");
        var savedUser = await newUser.save( function(err){
            var token;
            token = newUser.generateJsonWebToken();
            res.status(200);
            res.json({ "token" : token });
        });
        // TODO del
        console.log("Service - ...got user to save");
        return savedUser;
    }catch(e){
        // TODO del
        console.log(e);
        console.log("Service - failed at saving user");
        // return a Error message describing the reason     
        throw Error("Error while Creating User");
    }
}

exports.updateUser = async function(user){
    var id = user.id;
    try{
        //Find the old User Object by the Id
        console.log("Service - trying to find user to update by id ...");
        var oldUser = await User.findById(id);
        console.log("Service - ... found user to update by id.");
    }catch(e){
        throw Error("Error occured while Finding the User");
    }
    // If no old User Object exists return false
    if(!oldUser){
        return false;
    }
    console.log("old user :", oldUser)
    //Edit the User Object
    oldUser.id = user.id,
    oldUser.name = user.name,
    oldUser.created = user.created,
    oldUser.file = user.file,
    console.log("becomes : ", oldUser);

    try{
        console.log("Service - trying to save...");
        //Find the old User Object by the Id
        var savedUser = await User.replaceOne({_id:id}, oldUser);
        console.log("Service - ...saved user.");
        return savedUser;
    }catch(e){
        console.log(e);
        throw Error("Error occured while saving the User");
    }
}

exports.deleteUser = async function(id){
    // Delete the user
    try{
        console.log("Service.js - trying to delete user ...");
        console.log(id);
        var deleted = await User.remove({_id:id});
        console.log("Service.js - ... got user to delete");
        if(deleted.n === 0){
            return ("Service.js - could not delete user")
        }
        return deleted
    }catch(e){
        console.log(e);
        throw Error("Error Occured while Deleting the User");
    }
}
