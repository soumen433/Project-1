const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");
const middleware=require("../middlewares/auth")


<<<<<<< HEAD



router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog",/*midW.val,*/ blogController.createBlog)
 router.put("/blogs/:blogId", midW.val, blogController.updateBlogs)

router.post("/blogs/:blogId",/*midW.val,*/ blogController.deleteBlogs)

router.post("/blogs" ,/*midW.val,*/ blogController.deleteBlogsByFields)

 router.get("/blogs",/*midW.val,*/ blogController.getBlog)
=======
router.post("/createauthor",authorsController.createAuthor)
>>>>>>> 436595e32290cc19d3194529cb22e305e53b3e66

router.post("/login", blogController.loginAuthor)

router.post("/createBlog",middleware.authEntication, blogController.createBlog)

router.get("/blogs",middleware.authEntication, blogController.getBlog)

router.post("/blogs" ,middleware.authEntication, blogController.deleteBlogsByFields)

router.put("/blogs/:blogId",middleware.authEntication,middleware.authorIsation,blogController.updateBlogs)


router.put("/blogs/:blogId",middleware.authEntication,middleware.authorIsation, blogController.deleteBlogs)






module.exports = router;