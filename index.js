const express = require("express");
const app = express()
app.use(express.json())
const { default: mongoose } = require("mongoose")



mongoose.connect("mongodb+srv://ritesh:zbZGz8vHtAKmPfio@newcluster.88v7uq9.mongodb.net/compony-project", 

{ useNewUrlParser: true }, 
mongoose.set('strictQuery', true)

)
    .then(() => { console.log("mongoodb is connected") })
    .catch((err) => {
        console.log(err)
    })

const router=require("./route")


app.use("/",router)

app.listen(3000, () => {
    console.log("server is running" + 3000)
})