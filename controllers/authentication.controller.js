var passport = require('passport');
//var User = require('../models/user.model');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// Saving the context of this module inside the _this variable
_this = this;

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };

exports.register = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
        "token" : token
        });
    });

    };

exports.login = async function(req, res, next){

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
    
        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({ "token" : token });
        } else {
        // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

exports.profileRead = async function(req, res) {
    // If no user ID exists in the JWT return a 401
    try{
        if (!req.payload._id) {
            return res.status(401).json({
                "message" : "UnauthorizedError: private profile"
            });
        } else {
            // Otherwise continue
            User
            .findById(req.payload._id)
            .exec(function(err, user) {
                return res.status(200).json(user);
            });
        }
    }catch(e){
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}
