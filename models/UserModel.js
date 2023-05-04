const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true,"username is required."],unique: true},
    name: {type: String, required: [true,"All filed are required."]},
    password: {type: String, required: [true,"All filed are required."]},
    
},{timestamps:true});



module.exports = mongoose.model("User", UserSchema);