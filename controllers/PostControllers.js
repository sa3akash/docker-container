const Post = require("../models/PostModel");



exports.getAllPosts = async (req,res,next) => {
    try {
        const posts = await Post.find();
        console.log(req.session)
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: posts
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


exports.getOnePost = async (req,res,next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}


exports.createPost = async (req,res,next) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "success",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

exports.updatePost = async (req,res,next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.status(200).json({
            status: "success",
            data: post
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

exports.deletePost = async (req,res,next) => {
    try {
         await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: "delete a post success"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}
