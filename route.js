const express=require("express")
const router=express.Router()


const{ createAdmin, loginAdmin, createStudent, getStudent, updateStudent, deleteStudent }= require("../src/controllers/student")

router.post("/create",createAdmin)
router.get("/login",loginAdmin)
router.post("/login",createStudent)
router.get("/login",getStudent)
router.put("/login",updateStudent)
router.delete("/login",deleteStudent)


module.exports=router