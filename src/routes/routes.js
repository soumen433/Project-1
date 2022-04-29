
const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");
const midW = require("../middlewares/auth")





<<<<<<< HEAD
 router.post("/createAuthor", authorsController.createAuthor)

// router.post("/createBlog", blogController.createBlog)

// router.put("/blogs/:blogId",blogController.updateBlogs)
=======
router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog",/*midW.val,*/ blogController.createBlog)
 router.put("/blogs/:blogId", /*midW.val,*/ blogController.updateBlogs)
>>>>>>> 85e0f925b171b507a1be89488c848a862df57e02

router.post("/blogs/:blogId",/*midW.val,*/ blogController.deleteBlogs)

<<<<<<< HEAD
//router.post("/blogs" , blogController.deleteBlogsByFields)
=======
router.post("/blogs" ,/*midW.val,*/ blogController.deleteBlogsByFields)
>>>>>>> 85e0f925b171b507a1be89488c848a862df57e02

 router.get("/blogs",/*midW.val,*/ blogController.getBlog)

//router.post("/login", blogController.loginAuthor)




module.exports = router;







