

const express = require('express');
const router = express.Router();

const authorsController = require ("../controllers/authorsController.js");
const blogController = require ("../controllers/blogController.js");





router.post("/createAuthor", authorsController.createAuthor)

router.post("/createBlog", blogController.createBlog)

router.get("/blogs",blogController.getBlog)


module.exports = router;