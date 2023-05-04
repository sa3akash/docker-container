const auth = (req, res, next) => {
    const {user} = req.session;

    if (!user) {
        return res.status(401).json({success: "faild", message: "Your not authenticated user."});
    }
    req.user = user;
    next();
}



module.exports = {
    auth
}