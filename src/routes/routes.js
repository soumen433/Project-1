const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");
const midW = require("../middlewares/auth")





router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog",/*midW.auth,*/ blogController.createBlog)
 router.put("/blogs/:blogId", /*midW.auth,*/ blogController.updateBlogs)

router.post("/blogs/:blogId",/*midW.auth,*/ blogController.deleteBlogs)

router.post("/blogs" ,/*midW.auth,*/ blogController.deleteBlogsByFields)

 router.get("/blogs",/*midW.auth,*/ blogController.getBlog)

router.post("/login", blogController.loginAuthor)

module.exports = router;