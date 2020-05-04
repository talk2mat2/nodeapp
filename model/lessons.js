const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const shortId= require('shortid')


const lessons = new Schema({
    date_created:{type:Date},
    booked_by:[{}]
})