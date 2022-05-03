
const express = require('express');
const router = express.Router();

const authorsController = require("../controllers/authorsController.js");
const blogController = require("../controllers/blogController.js");
const middleware = require("../middlewares/auth")




router.post("/createAuthor", authorsController.createAuthor)

router.post("/login", blogController.loginAuthor)

router.post("/createBlog", middleware.authEntication, blogController.createBlog)

router.get("/blogs", middleware.authEntication, blogController.getBlog)

router.put("/blogs/:blogId", middleware.authEntication, middleware.authorIsation, blogController.updateBlogs)

router.delete("/blogs", middleware.authEntication, middleware.authorIsation, blogController.deleteBlogsByFields)

router.delete("/blogs/:blogId", middleware.authEntication, middleware.authorIsation, blogController.deleteBlogs)




module.exports = router;

