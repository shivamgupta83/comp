
const jwt = require("jesonwebtoken")

const authentication = async(req,res,next)=>{

const token= req.headers["authentication"]
if(!token|| typeof header =="undefined") res.status(400).send({ status: false, msg: "token is not present" })

jwt.verify(token,"key",(err)=>{
    if(err&& err.message=="jwt expired")  res.status(400).send({ status: false, msg: "token is expired" })
    if(err)  res.status(400).send({ status: false, msg: "invalidToken"})
    next()
})
}


module.exports={authentication}