const mongoose = require("mongoose");

//create schema
const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
});

//create model
const userModel = mongoose.model("users",userSchema);

module.exports = userModel;