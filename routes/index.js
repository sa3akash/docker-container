const express = require('express');
const PostController = require("../controllers/PostControllers")
const UserController = require("../controllers/UserControllers");
const { auth } = require('../middlewares/authMiddleware');

const router = express.Router();


router.route("/posts").get(auth,PostController.getAllPosts).post(auth,PostController.createPost)
router.route("/posts/:id").get(auth,PostController.getOnePost).patch(auth,PostController.updatePost).delete(auth,PostController.deletePost)



router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/users", auth, UserController.getAllUsers)


module.exports = router;