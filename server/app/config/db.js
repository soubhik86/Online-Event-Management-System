const mongoose = require('mongoose');


const dbConnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected.")
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = dbConnect;