const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authEntication = async function (req, res, next) {
    try {
        let header = req.headers;
        let token = header["x-api-key"];

        //handle upercase as well as lower case

        if (!token) return res.status(401).send({ msg: "Sorry,Header Must Needed" })
        jwt.verify(token, "group-25");
    }
    catch (error) {
        return res.status(407).send({ msg: error.message})
    }

    next()
}


const authorIsation = async function (req, res, next) {
    try {
        let header = req.headers;
        let token = header["x-api-key"];

        let decodedToken = jwt.verify(token, "group-25");
        let blogId = req.params.blogId;
        let authorId = await blogModel.findOne({ _id: blogId }).select({ authorId: 1, _id: 0 })
        let _id = authorId.authorId.toString()
        // console.log(x)
        let logId = decodedToken.userId;
        console.log(logId)

        if (_id != logId) return res.status(403).send({ msg: "Sorry,authorisatiom required  " });
        // if (_id === logId) return res.status(407).send({ msg: "plz log-in first" });


    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

    next()
}
module.exports.authEntication = authEntication
module.exports.authorIsation = authorIsation