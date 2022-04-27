

const blogModel = require("../models/blogModel")
const BlogModel = require("../models/blogModel")


const createBlog = async function (req, res) {                                    // Second API

    try {
        let data = req.body
        let savedData = await BlogModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }

    catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg: "connection failed" })
    }

    
}

const getBlog = async function (req, res) {
    let data = req.query
    let authorId = data.authorId
    let category = data.category
    let tags = data.tags
    let subcategory = data.subcategory
    console.log(data)
    if (Object.keys(data).length === 0) {
        let allBlogs = await blogModel.find({ isPublished: true, isDeleted: false })
        if (allBlogs.length == 0) return res.status(404).send({ msg: "not found" })
        return res.status(200).send({ msg: allBlogs })
    }

    let filterBlogs = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory}]})
    res.status(200).send({ msg: filterBlogs })




}
module.exports.getBlog = getBlog
module.exports.createBlog = createBlog