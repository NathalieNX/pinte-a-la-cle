var User = require('../models/user.model');

// Saving the context of this module inside the _this variable
_this = this;

// Async Controller function to get the User List

exports.getUsers = async function(req, res, next){
    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10; 
    try{
        var users = await UserService.getUsers({}, page, limit)
        // Return the todos list with the appropriate HTTP Status Code and Message.
        return res.status(200).json({status: 200, data: users, message: "Succesfully Recieved Users"});
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the User by id

exports.getUser = async function(req, res, next){
    // Id is necessary for the update
    var id = req.params.id;
    var query = User.findOne({_id:id});
    query.exec(
        function(err, user){
            if(err){
                return res.status(400).json({status: 400, message: "Controller - Id must be present to get user"});
            }
            return res.status(200).json({status: 200, data: user, message: `Controller - Succesfully got User id=${id}`});
        }
    )
}

// Async Controller function to add new User 

exports.createUser = async function(req, res, next){
    // Req.Body contains the form submit values.
    // TODO use user class ?
    var user = new User();
    user.id = req.body.id,
    user.name = req.body.name,
    user.setPassword(req.body.password);

    try{   
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Controller - Succesfully Created User"})
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Controller - User Creation was Unsuccesfull"})
    }
}

// Async Controller function to modify existing User 

exports.updateUser = async function(req, res, next){
    console.log(req.body);
    // Id is necessary for the update
    if(!req.body._id){
        return res.status(400).json({status: 400, message: "Controller - Id must be present to update"})
    }
    var id = req.body._id;
    console.log("req.body : ", req.body);
    var user = {
        id,
        name : req.body.name ? req.body.name : null,
    }
    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Controller - Succesfully Updated User"});
    }catch(e){
        return res.status(400).json({status: 400., message: e.message});
    }
}

// Async Controller function to remove User by id

exports.removeUser = async function(req, res, next){
    var id = req.params.id;
    console.log(`Controller - id is ${id}`)
    try{
        var deleted = await UserService.deleteUser(id)
        console.log("Controller - got deleted user :", deleted);
        return res.status(204).json({status:204, data: deleted, message: "Controller - Succesfully Deleted User"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}

