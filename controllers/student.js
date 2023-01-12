const student = require("../models/student")
const bcrypt = require("bcrypt")


const createStudent = async (req, res) => {

    const data = req.body
    let { name, password } = data


    if (!name) res.status(400).send({ status: false, msg: "name is not present" })
    if (!password) res.status(400).send({ status: false, msg: "password is not present" })
    data.password = await bcrypt.hash(password, 10)
    const createdData = await student.create(data)

    return res.status(201).send({ msg: createdData })

}

module.exports = { createStudent }