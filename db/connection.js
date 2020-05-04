
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/martins"
// const url ='mongodb+srv://Martins_c:chibuzo1@cluster0-gussd.mongodb.net/test?retryWrites=true&w=majority'

const connectDB= async()=>{
 await mongoose.connect(url,{ useUnifiedTopology: true ,useNewUrlParser:true} );
console.log('connected to remote mongodb server')
}

module.exports = connectDB;