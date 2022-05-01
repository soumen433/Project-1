const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const BlogModel = require("../models/blogModel")
const moment = require('moment')



const createBlog = async function (req, res) {

    try {
        let data = req.body
        console.log(data)
        if(Object.keys(data).length==0) return res.status(400).send({status:false,msg:"Body must require"})
        let validAuthor= await authorModel.findById({_id:data.authorId})
       // console.log(validAuthor)  when data not found in db,findBYid gives alaways null
        if(validAuthor===null) return res.status(400).send({status:false,msg:"Author Id not valid"})
        let time=moment().format('YYYY-MM-DDTHH:MM:ss.SSS')
        if(data.isPublished==true) data.publishedAt=time
        if(data.isDeleted==true) data.deletedAt= time
       let savedData = await BlogModel.create(data)
        res.status(201).send({ status: true, data: savedData })
    }


    catch (error) {
        console.log(error)
        res.status(400).send({ status: false, msg:error.message })
    }

}

// PUT API Updates a blog by changing the its title, body, adding tags, adding a subcategory.
// (Assuming tag and subcategory received in body is need to be added)

const updateBlogs = async function (req, res) {
    try {
        let time = moment()
        let publishedAt = time.format('YYYY-mm-ddTHH:MM:ssZ')

        let isPublished = req.body.isPublished
        let isDeleted=req.body.isDeleted
        var blogId = req.params.blogId
        let gotblog = await blogModel.find({_id:blogId,isDeleted:false})//Finding blogId in blogModel
        if (!gotblog) return res.status(404).send("No blogs exist")//check blogId is valid or not

        if (isPublished === true) {
            req.body.publishedAt = publishedAt
            let detailsToUpdate = req.body
            var updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, detailsToUpdate, { new: true })//Updating the details are coming from request
            res.status(200).send({ status: true, data: updatedBlog })
        }
        else {
            req.body.publishedAt = " "
            detailsToUpdate = req.body
            var updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, detailsToUpdate, { new: true })
            res.status(200).send({ status: true, data: updatedBlog })
        }
    }

    catch (err) {
        res.status(400).send({status : false, msg: err.message })

    }
}

const deleteBlogs = async function (req, res) {
    try {
        let id = req.params.blogId
        let allBlogs = await BlogModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
        if (allBlogs) res.status(200).send({ status: true, msg: allBlogs })
        else res.status(404).send({ status: false, msg: "No Blogs Exist" })
    } catch (err) {
        res.status(400).send({ status: false, msg: err.message })
    }
}

// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like

const deleteBlogsByFields = async function (req, res) {
    try {
        let data = req.query
        data.isDeleted = false
        let any = await BlogModel.find(data)
        if (Object.keys(any).length !== 0) {
            let all = await BlogModel.updateMany(data, { $set: { isDeleted: true } }, { new: true })
            res.status(200).send({ status: true, msg: all })
        }
        else res.status(404).send({ status: false, msg: "No Blogs Exist" })
    } catch (err) {
        res.status(400).send({ status: false, msg: err.message })
    }
}



const getBlog = async function (req, res) {
    try{
        let data = req.query 
      console.log(data)
        if (Object.keys(data).length === 0) {
            let allBlogs = await blogModel.find({ isPublished: true, isDeleted: false})
            if (allBlogs.length == 0) return res.status(404).send({ status: false, msg: "not found" })
            return res.status(200).send({ status: true, msg: allBlogs })
        }

        let filterBlogs = await blogModel.find({$and:[data,{ isPublished: true }, { isDeleted: false }] })
        console.log(filterBlogs)
        if (filterBlogs.length === 0) return res.status(404).send({ status: false, msg: "data not found" })


        res.status(200).send({ status: true, msg: filterBlogs })
    }
    catch(error){
        res.status(400).send({status : false, msg : error.message})
    }


}


const loginAuthor = async function (req, res) {
    try{
        let email = req.body.email
        let password = req.body.password
        if (!email) return res.status(400).send({ status: false, msg: "plz enter email" })
        if (!password) return res.status(400).send({ status: false, msg: "plz enter password" })
        let valid = await authorModel.findOne({ email: email, password: password })
        if (!valid) {
            return res.status(404).send({ status: false, msg: "email or password is wrong" })
        }
        let token = jwt.sign({
            authorId: valid._id.toString(),
            group: 25,
            batch: "uranium"
        }, "group-25")
        res.setHeader("x-api-key", token)
        res.status(200).send({ status: true, data: token })
    }
    catch(error){
        res.status(400).send({status : false, msg : error.message})
    }
}




module.exports.loginAuthor = loginAuthor
module.exports.getBlog = getBlog
module.exports.createBlog = createBlog
module.exports.deleteBlogsByFields = deleteBlogsByFields
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs

