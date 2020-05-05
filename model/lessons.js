const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const shortId= require('shortid')


const lessons = new Schema({
    description:{type:String,required:true},
    date_booked:{type:Date,default:Date.now},
    booked_by:[{type:Schema.Types.ObjectId,re:'user'},{type:Schema.Types.ObjectId,re:'Tutor'}]
});

const Lessons= mongoose.model('lessons',lessons);
module.exports= Lessons;
