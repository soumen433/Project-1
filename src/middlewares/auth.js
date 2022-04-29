
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authEntication = async function (req, res, next) {
    try {
        let header = req.headers;
        let token = header["x-api-key"];

        if (!token) return res.status(400).send({ msg: "Sorry,Header Must Needed" })

        jwt.verify(token, "group-25");
        next()
    }
    catch (error) {
        
        return res.status(407).send({ msg: error.message })
    }

   
}



const authorIsation = async function (req, res, next) {
    try {
        let header = req.headers;
        let token = header["x-api-key"];

        let decodedToken = jwt.verify(token, "group-25");
        let blogId = req.params.blogId;
        
        let authorId = await blogModel.findOne({ _id: blogId }).select({ authorId: 1, _id: 0 })
        console.log(authorId)
        let _id = authorId.authorId.toString()
        console.log(_id)
        let logId = decodedToken.authorId;
         if (_id != logId) return res.status(401).send({ msg: "Sorry,authorisation required  " });
         next()

    }
    catch (error) {
        return res.status(404).send({ msg: "plz enter valid Blog Id,this Id not found" })
    }

    
}
module.exports.authEntication = authEntication
module.exports.authorIsation = authorIsation
