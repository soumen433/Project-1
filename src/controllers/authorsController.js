
const AuthorModel = require("../models/authorModel")
function validateEmail(usermail) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(usermail);
}

const createAuthor = async function (req, res) {

    try {
        let data = req.body
        if (!validateEmail(data.email)) return res.status(400).send({ status: false, msg: "plz enter valid email(like-aBcd123@gmail.com)" })
        if (Object.keys(data).length != 0) {
            let a = await AuthorModel.find({ email: data.email })
            if (a.length != 0) return res.status(400).send({ status: false, msg: "email already used" })
            let savedData = await AuthorModel.create(data)
            res.status(201).send({ msg: savedData })
        }

        else res.status(400).send({ msg: " body not Found" })

    }
    catch (error) {

        res.status(500).send({ msg: error.message })



    }


}


module.exports.createAuthor = createAuthor


