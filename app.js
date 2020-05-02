const express= require('express');
const app = express();
const connectDB = require('./database/connection')

connectDB()
app.use(express.json({extended:false}));
app.use('/Api/user',require('./routes/auth'));
const port = process.env.PORT || 8080
app.listen(port,()=>(console.log('server runinng on port 8080')));