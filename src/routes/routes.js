const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");
const midW = require("../middlewares/auth")





router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog",/*midW.val,*/ blogController.createBlog)
 router.put("/blogs/:blogId", /*midW.val,*/ blogController.updateBlogs)

router.post("/blogs/:blogId",/*midW.val,*/ blogController.deleteBlogs)

router.post("/blogs" ,/*midW.val,*/ blogController.deleteBlogsByFields)

 router.get("/blogs",/*midW.val,*/ blogController.getBlog)

router.post("/login", blogController.loginAuthor)

module.exports = router;