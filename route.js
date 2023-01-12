const express=require("express")
const router=express.Router()


const school= require("../src/controllers/student")

router.post("/create",school.createStudent)

module.exports=router