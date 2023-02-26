const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { model } = require("mongoose")
const bcrypt = require("bcrypt")
const multer = require("multer");
const path = require("path")
const Message = require("../models/Contact")
const User = require("../models/User")
const Blog = require("../models/Blog")
const Comment = require("../models/Comment")
const Like = require("../models/Like")
const Login = require("../models/Login")
const Admin = require("../models/Admin")
const Image = require("../models/Upload")
const AuthMiddleware = require("../middlewares/AuthMiddleware")
const MulterMiddleware = require("../middlewares/MulterMiddleware")
const PublicAuthMiddleware = require("../middlewares/authToken")
const MessageController = require("../controllers/messageController")
const UserController = require("../controllers/userController")
const BlogController = require("../controllers/blogController")
const CommentController = require("../controllers/commentController")
const LikeController = require("../controllers/likeController")
const AdminController = require("../controllers/adminController");
const AuthController = require("../controllers/authController");
const PublicController = require("../controllers/publicController");
const { findById } = require("../models/Contact");
const upload = require("../middlewares/MulterMiddleware");
const router = new express.Router()
dotenv.config();



router.get("/users/admin", AuthMiddleware.checkAuthenticationStatus, AdminController.getAdmin)
router.delete("/users/admin", AuthMiddleware.checkAuthenticationStatus, AdminController.deleteAdmin)
router.post("/users/admin", async (req, res) => {
    try {

        const hashedP = await bcrypt.hash(req.body.password, 10)
        const { email, names, password } = req.body;
        const addedDate = new Date();

        if (!email || !names || !password)
            res.status(400).json({ msg: "Please add all required inputs", error: "" })
        const _admin = new Admin({
            names,
            email,
            password: hashedP,
            created_on: addedDate,
        })
        await _admin.save()
        const token = jwt.sign({ id: Admin.id }, process.env.TOKEN_SECRET, {
            expiresIn: 60
        })
        return res.status(201).json({ msg: "Admin added successfully", data: _admin, token })
    } catch (error) {
        throw new Error(error)
    }

})


router.get("/messages", AuthMiddleware.checkAuthenticationStatus, MessageController.getMessages)
router.get("/messages/:id", AuthMiddleware.checkAuthenticationStatus, AuthMiddleware.checkAuthenticationStatus, MessageController.getSingle)
router.delete("/messages/:id", AuthMiddleware.checkAuthenticationStatus, MessageController.deleteSingle)
router.post("/messages", async (req, res) => {
    try {

        const { email, message, name } = req.body;
        const addedDate = new Date();

        if (!email || !name || !message) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _message = new Message({
            name,
            email,
            message,
            sent_On: addedDate,
        })
        await _message.save()
        return res.status(201).json({ msg: "Message sent successfully", data: _message })
    } catch (error) {
        throw new Error(error)
    }
})



router.post("/users/login/admin", AuthController.login);
router.post("/users/login", PublicController.PublicLogin);


// USERS


router.get("/users", AuthMiddleware.checkAuthenticationStatus, UserController.getUsers)
router.get("/users/:id", AuthMiddleware.checkAuthenticationStatus,UserController.getSingle)
router.delete("/users/:id", AuthMiddleware.checkAuthenticationStatus,UserController.deleteSingle)
router.patch("/users/:id", AuthMiddleware.checkAuthenticationStatus, UserController.updateSingle)
router.post("/users", async (req, res) => {
    try {

        const hashedP = await bcrypt.hash(req.body.password, 10)
        const { email, names, password } = req.body;
        const userP = password === req.body.password
        const addedDate = new Date();
        const doesExist = await User.findOne({ email });

        if (!email || !names || !password) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        } else if (doesExist) {
            return res.status(400).json({ msg: "Email already exists", error: "" })
        } else {

            const _user = new User({
                names,
                email,
                password: hashedP,
                created_on: addedDate,
            })
            await _user.save()
            return res.status(201).json({ msg: "Signed Up successfully", data: _user })
        }
    } catch (error) {
        return res.status(500).json({ msg: "Something went wrong" })
    }
})



// POSTS


router.get("/blogs", BlogController.getBlogs)
router.get("/blogs/:id", BlogController.getSingle)
router.delete("/blogs/:id", AuthMiddleware.checkAuthenticationStatus, BlogController.deleteSingle)
router.patch("/blogs/:id", AuthMiddleware.checkAuthenticationStatus, BlogController.updateSingle)
router.post("/blogs", AuthMiddleware.checkAuthenticationStatus, async (req, res) => {
    try {

        // try {
        //     console.log(req.data);
        //     const blogImage = new Image({
        //         path: req.data.originalname,
        //         created_on: new Date(),
        //     });
        //     await blogImage.save
        // } catch (error) {

        // }

        const { title, subtitle, content, image } = req.body;
        const addedDate = new Date();

        if (!title || !subtitle || !content || !image) {
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })
        }
        const _blog = new Blog({
            title,
            image,
            subtitle,
            content,
            created_on: addedDate,
        })
        await _blog.save()
        return res.status(201).json({ msg: "Blog added successfully", data: _blog })
    } catch (error) {
        throw new Error(error)
    }
})


// router.post("/upload", async (req, res) => {
//     try {
//         console.log(req.data);
//         const images = new Image({
//         path: req.data.originalname,
//         created_on: new Date(),
//         });
//       await images.save
//     } catch (error) {

//     }
// })



// COMMENTS



router.get("/comments", CommentController.getComments)
router.get("/comments/:id", CommentController.getSingle)
router.delete("/comments/:id", AuthMiddleware.checkAuthenticationStatus, CommentController.deleteSingle)
router.post("/comments/:id", PublicAuthMiddleware.checkAuthentication, async (req, res) => {
    try {
        const addedDate = new Date();
        const { id } = req.params;
        const blog = await Blog.findById(id);
        const { comment } = req.body;

        if (!blog)
            return res.status(400).json({ msg: "Blog Not found", error: "" })
        if (!comment)
            return res.status(400).json({ msg: "Please add all required inputs", error: "" })

        const _comment = new Comment({
            comment,
            user: req.id,
            created_on: addedDate,
        })
        await _comment.save()
        blog.comments.push(_comment.id);
        await blog.save();

        // console.log(blog, req.id);
        return res.status(201).json({ msg: "Comment added successfully", data: _comment })
    } catch (error) {
        throw new Error(error)
    }
})


// LIKES //

router.delete("/comments/:id", AuthMiddleware.checkAuthenticationStatus, LikeController.deleteSingle)
router.post("/likes/:id", PublicAuthMiddleware.checkAuthentication, async (req, res) => {
    try {
        const addedDate = new Date();
        const { id } = req.params;
        const blog = await Blog.findById(id);
        const { like } = req.body;

        if (!blog)
            return res.status(400).json({ msg: "Blog Not found", error: "" })

        const _like = new Like({
            user: req.id,
            created_on: addedDate,
        })
        await _like.save()
        blog.likes.push(_like.id);
        await blog.save();

        console.log(blog, req.id);
        return res.status(201).json({ msg: "like added successfully", data: _like })
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = router;