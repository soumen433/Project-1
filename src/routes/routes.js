const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");





router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog", blogController.createBlog)

router.post("/blogs/:blogId", blogController.deleteBlogs)

router.post("/blogs" , blogController.deleteBlogsByFields)



module.exports = router;