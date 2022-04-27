

const blogModel = require("../models/blogModel")
const BlogModel = require ("../models/blogModel")


const createBlog= async function (req, res) {                                    // Second API
   
    try { let data= req.body
    let savedData= await BlogModel.create(data)
    res.status(201).send({ status: true, data: savedData})
     }

catch (error){
    console.log(error)
    res.status(400).send({ status: false, msg: "connection failed"})
}
}
 const updateBlogs= async function(req,res){
     try{
     let blogId=req.params.blogId
     
      let gotblog=await blogModel.findById(blogId)
     if(!gotblog){ return res.status(404).send("No blogs exist")
    }
    let detailsToUpdate=req.body
    let updatedBlog=await blogModel.findOneAndUpdate({_id:blogId},detailsToUpdate,{new:true})
res.status(200).send({status:true,data:updatedBlog})
     }
 catch(err){
     console.log(err)
     res.status(500).send({msg:err.message})
}
}


   module.exports.createBlog = createBlog
   module.exports.updateBlogs=updateBlogs