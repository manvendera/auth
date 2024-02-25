const mongoose = require('mongoose')
require('dotenv').config()
const API = process.env.DATABASE_URL
const dbConnect = async (req,res)=>{
    mongoose.connect(API,
        
 )
       .then(() =>{
        console.log('database connection successfuly');
       })
       .catch((err)=>{
        console.log(`database doesn't connected successfuly` );
        console.error(err);
        process.exit(1)
       })
}

module.exports = dbConnect