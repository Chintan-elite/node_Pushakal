const router = require("express").Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
router.get("/",(req,resp)=>{
    resp.render("index")
})

router.get("/contact",(req,resp)=>{
    resp.render("contact")
})

router.get("/shop-details",(req,resp)=>{
    resp.render("shop-details")
})

router.get("/shop-grid",(req,resp)=>{
    resp.render("shop-grid")
})

router.get("/shoping-cart",auth,(req,resp)=>{
    resp.render("shoping-cart")
})

router.get("/login",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})

//***********user********** */
const User = require("../model/users")

router.post("/adduser",async(req,resp)=>{

    try {
        const user = new User(req.body)
        const data = await user.save();
        resp.render("reg",{msg:"Registration successfully !!!"})
    } catch (error) {
        console.log(error);
    }
})

router.post("/userlogin",async(req,resp)=>{
    try {
        const user =await User.findOne({email:req.body.email})

        var isValid=await bcrypt.compare(req.body.pass,user.pass)

        if(isValid)
        {

            const token = await jwt.sign({_id:user._id},process.env.SKEY)
            resp.cookie("jwt",token)
            resp.render("index",{uname:"welcome ,"+user.uname,status:true})
        }
        else{
            resp.render("login",{err:"Invalid credentials !!!!"})
        }


    } catch (error) {
        resp.render("login",{err:"Invalid credentials !!!!"})
    }
})

router.get("/logout",(req,resp)=>{
    resp.clearCookie("jwt")
    resp.redirect("/")
})


module.exports = router