const User = require("../models/UserModel")
const bcrypt = require("bcrypt")

exports.register = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        const newUser = await user.save();
         // assume that credentials are correct
         req.session.user = {
            username: newUser.username,
            id: newUser._id,
            name: newUser.name
        };
        res.status(201).json(newUser)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return res.status(404).json({message: 'User not found'})
        if(!bcrypt.compareSync(req.body.password,user.password)){
            return res.json({message: 'Invalid password'})
        }
        // assume that credentials are correct
        req.session.user = {
            username: user.username,
            id: user._id,
            name: user.name
        };
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        res.status(200).json({
            status: "success",
            results: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

