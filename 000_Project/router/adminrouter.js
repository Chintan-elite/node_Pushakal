
const router = require("express").Router()

router.get("/admin",(req,resp)=>{
    resp.render("adminlogin")
})

router.get("/adminhome",(req,resp)=>{
    resp.render("adminhome")
})


module.exports=router