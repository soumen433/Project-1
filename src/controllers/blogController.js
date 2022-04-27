

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

   module.exports.createBlog = createBlog