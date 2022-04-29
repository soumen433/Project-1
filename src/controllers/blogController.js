const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const BlogModel = require ("../models/blogModel")
const moment=require('moment')
//const BlogModel = require("../models/blogModel")


const createBlog = async function (req, res) {                                    

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

// PUT API Updates a blog by changing the its title, body, adding tags, adding a subcategory.
// (Assuming tag and subcategory received in body is need to be added)

 const updateBlogs= async function(req,res){
     try{
     let blogId=req.params.blogId
     let time=moment()
     let publishedAt=time.format('YYYY-mm-ddTHH:MM:ssZ')
      let gotblog=await blogModel.findById(blogId)//Finding blogId in blogModel
     // console.log(gotblog)
     if(!gotblog){ return res.status(404).send("No blogs exist")//check blogId is valid or not
    }
    req.body.publishedAt=publishedAt
    let detailsToUpdate=req.body
    let updatedBlog=await blogModel.findOneAndUpdate({_id:blogId},detailsToUpdate,{new:true})//Updating the details are coming from request
res.status(200).send({status:true,data:updatedBlog})
     }

catch(err){
     console.log(err)
     res.status(500).send({msg:err.message})
}

 }



const deleteBlogs = async function(req, res){
    try{
        let id = req.params.blogId
        let allBlogs = await BlogModel.findOneAndUpdate({_id : id, isDeleted : false}, {$set: {isDeleted : true}},{new : true})
        if(allBlogs)res.status(200).send({status : true, msg : allBlogs})
        else res.status(404).send({status: false, msg : "No Blogs Exist"})
    }catch(err){
        res.status(404).send({status : false, msg : err.message})
    }
}

// Delete blog documents by category, authorid, tag name, subcategory name, unpublished
// If the blog document doesn't exist then return an HTTP status of 404 with a body like

const deleteBlogsByFields = async function(req, res){
    try{
        let data = req.query
        data.isDeleted = false
        let any = await BlogModel.find(data)
        if(Object.keys(any).length !== 0){
            let all = await BlogModel.updateMany(data , {$set : {isDeleted : true}}, {new : true})
            res.status(200).send({status : true, msg : all})
        }
        else res.status(404).send({status : false, msg : "No Blogs Exist"})
    }catch(err){
        res.status(404).send({status : false, msg : err.message})
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
        if (allBlogs.length == 0) return res.status(404).send({status:false, msg: "not found" })
        return res.status(200).send({ status:true,msg: allBlogs })
    }

    let filterBlogs = await blogModel.find({ $or: [{ authorId: authorId }, { category: category }, { tags: tags }, { subcategory: subcategory}]})
    res.status(200).send({status:true, msg: filterBlogs })

}


const loginAuthor = async function(req, res){
    let email = req.body.email
    let password = req.body.password
    let valid = await authorModel.findOne({email : email, password : password})
    if(!valid){
        return res.status(404).send({status : false, msg : "username or password is wrong"})
    }
    let token = jwt.sign({
        authorId : valid._id.toString(),
        group : 25,
        batch : "uranium"
    }, "group-25")
    res.setHeader("x-api-key" , token)
    res.status(200).send({status: true , data : token})
}




module.exports.loginAuthor = loginAuthor
module.exports.getBlog = getBlog
module.exports.createBlog = createBlog
module.exports.deleteBlogsByFields = deleteBlogsByFields
module.exports.updateBlogs=updateBlogs
module.exports.deleteBlogs = deleteBlogs

