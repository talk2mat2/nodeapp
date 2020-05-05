const mongoose = require('mongoose');
const Schema=  mongoose.Schema


const subjects =Schema({
    subjectsName:{type:String,required:true,unique:true},
    class:[{type:Schema.Types.ObjectId,ref:'Category'}],
    subjects_tutor:[{type:Schema.Types.ObjectId,ref:'tutor',unique:true}]
    


    
})

var Subjects = mongoose.model('subjects',subjects);
module.exports = Subjects;