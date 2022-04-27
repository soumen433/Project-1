

const BlogModel = require ("../models/blogModel")


const createBlog= async function (req, res) {                                    // Second API
   
    try { let data= req.body
    let savedData= await BlogModel.create(data)
    res.status(201).send({ status: true, data: savedData})
     }

catch (error){
    res.status(400).send({ status: false, msg: error.message})
}
}

const deleteBlogs = async function(req, res){
    let id = req.params.blogId
    let allBlogs = await BlogModel.findOneAndUpdate({_id : id, isDeleted : false}, {$set: {isDeleted : true}},{new : true})
    if(allBlogs)res.status(200).send({status : true, msg : allBlogs})
    else res.status(404).send({status: false, msg : " "})
}

Delete blog documents by category, authorid, tag name, subcategory name, unpublished
If the blog document doesn't exist then return an HTTP status of 404 with a body like

const deleteBlogsByFields = async function(req, res){
    let data = req.query
    let any = await BlogModel.find(data)
    if(Object.keys(any).length !== 0){
        let all = await BlogModel.updateMany(data , {$set : {isDeleted : true}}, {new : true})
        res.status(200).send({status : true, msg : all})
    }
    else res.status(404).send({status : false, msg : ""})
    } 


module.exports.deleteBlogsByFields = deleteBlogsByFields
// module.exports.deleteBlogs = deleteBlogs
module.exports.createBlog = createBlog