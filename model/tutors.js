const mongoose = require('mongoose');
 bcrypt = require('bcrypt');

const tutor = new mongoose.Schema({
    userName:{type:String,unique: true},
    password:{type:String,select:false},
    firstName:{type:String},
    lastName:{type:String}
});

tutor.methods.comparePassword =function(password){
    return bcrypt.compareSync(password,this.password)
}
var Tutor = mongoose.model('tutor',tutor);
module.exports = Tutor;