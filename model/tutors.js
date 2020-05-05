
const mongoose = require('mongoose');
 bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
 

const tutor = new Schema({
    userName:{type:String,unique: true},
    password:{type:String,select:false},
    firstName:{type:String},
    lastName:{type:String},
    Admin_status:{type:Boolean,default:false},
    iTeach:[{type:Schema.Types.ObjectId,ref:'Subjects'}]
});

tutor.methods.comparePassword =function(password){
    return bcrypt.compareSync(password,this.password)
}
var Tutor = mongoose.model('tutor',tutor);
module.exports = Tutor;