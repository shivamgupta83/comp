const { default: mongoose } = require("mongoose");

const admin= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps:true})



module.exports=mongoose.model("admin",admin)