const mongoose = require("mongoose");

//connect database
const dbConnect = async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/passportAuthUser");
        console.log('database was connected successfully');
    } catch (error) {
        console.log(error);
        console.log('database not connected');
        process.exit(1);
    }
};

dbConnect();