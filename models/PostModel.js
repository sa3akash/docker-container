const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {type: String, required: [true,"Post must have title."]},
    content: {type: String, required: [true,"Post must have content."]},
    //author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true,"Post must have author."]}
    
},{timestamps:true});



module.exports = mongoose.model("Post", PostSchema);