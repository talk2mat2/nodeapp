const mongoose = require('mongoose');
 bcrypt = require('bcrypt');

const user = new mongoose.Schema({
    userName:{type:String, unique:true},
    password:{type:String},
    firstName:{type:String},
    lastName:{type:String}
});

user.methods.comparePassword =function(password){
    return bcrypt.compareSync(password,this.password)
}
var User = mongoose.model('user',user);
module.exports = User;