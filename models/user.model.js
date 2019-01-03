var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
//var crypto = require('crypto');
var jsonwebtoken = reqire('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    password: String,
    //hash: String,
    //salt: String
  });

// TODO CRITICAL : password are stored. This is a demo. 
// Store salt and hash instead, see :
// https://www.sitepoint.com/user-authentication-mean-stack/
// and commented lines below

UserSchema.methods.setPassword = function(password){
    //this.salt = crypto.randomBytes(16).toString('hex');
    //this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    this.password = password;
};

UserSchema.methods.validPassword = function(password) {
    //var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    //return this.hash === hash;
    return this.password === password;
};

userSchema.methods.generateJsonWebToken = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jsonwebtoken.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };


UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);