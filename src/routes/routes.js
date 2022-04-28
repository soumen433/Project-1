const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");
const middleware=require("../middlewares/auth")



router.post("/createAuthor", authorsController.createAuthor)

router.post("/login", blogController.loginAuthor)

router.post("/createBlog",middleware.authEntication, blogController.createBlog)

router.get("/blogs",middleware.authEntication, blogController.getBlog)

router.post("/blogs" ,middleware.authEntication, blogController.deleteBlogsByFields)

router.put("/blogs/:blogId",middleware.authEntication,middleware.authorIsation,blogController.updateBlogs)//blogController.updateBlogs)

router.post("/blogs/:blogId",middleware.authEntication,middleware.authorIsation, blogController.deleteBlogs)






module.exports = router;