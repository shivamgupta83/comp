const student = require("../models/student")
const admin = require("../models/admin")
const bcrypt = require("bcrypt")



const createAdmin = async (req, res) => {

    let data = req.body
    let { name, password } = data

    if (!name) return res.status(400).send({ status: false, msg: "name is not present" })
    if (!password) return res.status(400).send({ status: false, msg: "password is not present" })

    password = await bcrypt.hash(password, 100)

    const savedData = await admin.create(data)

    return res.status(201).send({ status: true, msg: "admin is created", Data: savedData })

}




const loginAdmin = async (req, res) => {
    const data = req.body
    let { name, password } = data
    if (!name) res.status(400).send({ status: false, msg: "name is not present" })
    if (!password) res.status(400).send({ status: false, msg: "password is not present" })

    const adminExist = await admin.findOne({ name })
    if (!adminExist) return res.status(404).send({ status: false, msg: "admin is not exist" })

    const validPassword = await bcrypt.compare(password, adminExist.password)
    if (!validPassword) return res.status(401).send({ status: false, msg: "inValid password" })

    const token = await jwt.sign({ adminData: adminExist }, "key")

    return res.status(200).send({ status: true, msg: "login is successfuly", token: token })

}



const createStudent = async (req, res) => {

    const data = req.body
    let { name, subjects } = data

    if (!name) res.status(400).send({ status: false, msg: "name is not present" })
    if (!subjects) res.status(400).send({ status: false, msg: "subjects is not present" })

    return res.status(201).send({ msg: createdData })

}


const getStudent = async (req, res) => {

    const qwery = req.qwery
    const findData = await student.find(qwery)
    if (!findData) return res.status(404).send({ status: false, msg: "data ia not find" })
    return res.status(200).send({ status: true, msg: "successfull", Data: findData })
}



const updateStudent = async (req, res) => {

    const data = req.body
    if (!data) return res.status(400).send({ status: false, msg: "data is not present" })

    let keys = Object.keys(data)

    if (!["name", "subjects"].includes(...keys)) return res.status(400).send({ status: false, msg: "data is wrong" })

    let { name, subjects } = data
    let { subName, marks } = subjects
    const existStudent = await student.findOne({ name })

    if (!existStudent) return res.status(404).send({ status: false, msg: "student is not present" })

    const subExist = existStudent.subjects.find((subjects) => subjects.subName == subName)

    if (subExist) {
        const indexNo = existStudent.subjects.indexOf(subExist)
        existStudent.subjects[indexNo].marks = existStudent.subjects[indexNo].marks + marks
        const saved = await student.findOneAndUpdate({ name }, existStudent, { new: true })
        return res.status(200).send({ status: true, msg: "successful", data: saved })
    }

    existStudent.subjects = existStudent.subjects.push(subjects)
    const saved = await student.findOneAndUpdate({ name }, existStudent, { new: true })
    return res.status(200).send({ status: true, msg: "successful", data: saved })

}


const deleteStudent = async (req, res) => {

    const data = req.body
    if (!data) return res.status(400).send({ status: false, msg: "data is not present" })

    let keys = Object.keys(data)

    if (!["name", "isDeleted"].includes(...keys)) return res.status(400).send({ status: false, msg: "data is wrong" })

    if (data.isDeleted != true) return res.status(400).send({ status: false, msg: "isDeleted is wrong" })

    const updatedData = await student.findOneAndUpdate({ name }, { isDeleted: true }, { new: true })

    return res.status(200).send({ status: false, msg: "DELETED successfully", data: updatedData })

}

module.exports = { createAdmin, loginAdmin, createStudent, getStudent, updateStudent, deleteStudent }