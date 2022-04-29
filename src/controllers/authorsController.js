

const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {   
    
    try {

    let data = req.body
    if(Object.keys(data).length !=0) {
        let savedData = await AuthorModel.create(data)
        res.status(201).send ({ msg: savedData})
    }

    else res.status (400).send({ mag: " Data not Found"})

}
    catch(error) {
        console.log(" this is error:", error.message)
        return
        res.status(500).send ({ msg: " Error", error:error.message})
    }
}
  
  
   module.exports.createAuthor = createAuthor


