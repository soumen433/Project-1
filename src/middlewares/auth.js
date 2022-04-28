const jwt = require("jsonwebtoken")
const authorModel = require("../models/authorModel")


//NOTE - middlewares have been imported in the route.js file
const val = function(req, res, next){
    try{
        
        
        
        next()
    }
    catch(error){
        res.status(404).send({status : false, msg : error.messsage})
    }
}

const auth = function(req, res, next){
    try{
        
        
        next()
    }
    catch(err){
        res.status(400).send({status : 400, msg : error.message})
    }
}
module.exports.auth = auth
module.exports.val = val
