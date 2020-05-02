const mongoose = require('mongoose');


const subjects = new mongoose.Schema({subjectsName:{type:String,required:true,unique:true}})

var Subjects = mongoose.model('subjects',subjects);
module.exports = Subjects;