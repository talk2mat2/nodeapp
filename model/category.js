const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const category = new Schema({className:{type:String,required:true,unique:true},
    subjects:[{type:Schema.Types.ObjectId,ref:'Subjects'}]
})

var Category = mongoose.model('category',category);
module.exports = Category;