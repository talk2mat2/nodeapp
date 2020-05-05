const express= require('express');
const app = express();
const connectDB = require('./db/connection')
const jwtUserId = require('./middleware/getuseridfromtoken')

connectDB()
// app.use(jwtUserId.checkid)
app.use(express.json({extended:false}));
app.use('/Api/v1',require('./routes/index'));
const port = process.env.PORT || 8080
app.listen(port,()=>(console.log('server runinng on port 8080')));