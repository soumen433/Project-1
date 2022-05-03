
const AuthorModel = require("../models/authorModel")
function validateEmail(usermail) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(usermail);
}

const createAuthor = async function (req, res) {

    try {
        let data = req.body
        if (Object.keys(data).length != 0) {
            let title = data.title
            if (!title) return res.send({ msg: "title must require" })
            if (title!== "Mr" && title!== "Mrs" && title !== "Miss") return res.status(400).send({ status: false, msg: "invalid titel,title should be -['Mr','Mrs','Miss']" })
            if (!data.fname) return res.status(400).send({ status: false, msg: "plz enter fname" })
            if (!data.lname) return res.status(400).send({ status: false, msg: "plz enter lname" })
            if (!data.password) return res.status(400).send({ status: false, msg: "plz enter password" })
            if (!data.email) return res.status(400).send({ status: false, msg: "plz enter email" })
            if (!validateEmail(data.email)) return res.status(400).send({ status: false, msg: "plz enter valid email(like-aBcd123@gmail.com)" })

            let a = await AuthorModel.find({ email: data.email })
            if (a.length != 0) return res.status(400).send({ status: false, msg: "email already used" })
            let savedData = await AuthorModel.create(data)
            res.status(201).send({ status: true,msg:"author registration successful", data: savedData })
        }


    

        else res.status(400).send({ status: false, msg: " body must require" })

    }
    catch (error) {

        res.status(500).send({ status: false, msg: error.message })



    }


}


module.exports.createAuthor = createAuthor


