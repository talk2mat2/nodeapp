const mongoose = require('mongoose');


const category = new mongoose.Schema({className:{type:String,required:true,unique:true}})

var Category = mongoose.model('category',category);
module.exports = Category;