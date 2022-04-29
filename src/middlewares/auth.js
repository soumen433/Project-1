
const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const authEntication = async function (req, res, next) {
    try {
        let header = req.headers;
        let token = header["x-api-key"];

        if (!token) return res.status(401).send({ msg: "Sorry,Header Must Needed" })
        jwt.verify(token, "group-25");
    }
    catch (error) {
        return res.status(407).send({ msg: error.message })
    }

    next()
}

const auth = function(req, res, next){
    try{
        
        
        next()
    }
    catch (error) {
        return res.status(404).send({ msg: "plz enter valid Blog Id,this Id not found" })
    }

    next()
}
module.exports.authEntication = authEntication
module.exports.authorIsation = authorIsation
