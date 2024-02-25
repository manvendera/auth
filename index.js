const express = require('express')
const app = express()
require('dotenv').config()
//import database  connection file
const dbConnect = require('./config/db')
const PORT = process.env.PORT || 4000;
// cookie-parser 
const cookieParser = require('cookie-parser') 
app.use(cookieParser())
// use middleware
app.use(express.json())
// database connection function call
dbConnect()

app.listen(PORT,()=>{
    console.log(`App is listing at ${PORT}`);
})

// route import and mount
const user = require('./routes/user')
app.use('/api/v1',user)