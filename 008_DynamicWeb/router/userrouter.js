const express = require("express")
const router = express.Router()


router.get("/",(req,resp)=>{
    resp.render("index",{uname:"Pushkal"})
})

router.get("/about",(req,resp)=>{
    resp.render("about")
})


router.get("/contact",(req,resp)=>{
    resp.render("contact")
})

router.get("/help",(req,resp)=>{
    resp.render("help")
})

module.exports=router