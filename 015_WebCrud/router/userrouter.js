const router = require("express").Router()
const multer = require("multer")
const User = require("../model/users")
const bcrypt = require("bcryptjs")
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "./public/profile") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
}) 

var upload = multer({
    storage:storage
}).single("image")
    


router.get("/",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("registration")
})

router.get("/home",async(req,resp)=>{

    try {
        
        const user = await User.find();
        resp.render("home",{userdata:user})
    } catch (error) {
        console.log(error);
    }
   
})
router.post("/adduser",upload,async(req,resp)=>{
   
    try {
        const user = new User({username:req.body.username,email:req.body.email,password:req.body.password,img:req.file.filename})
        const data = await user.save()
        resp.render("registration",{"msg":"registration successfully !!!"})
    } catch (error) {
        
    }
    
})

router.post("/userlogin",async(req,resp)=>{
    try {
        
        const user = await User.findOne({email:req.body.email})

        var isValid =   await bcrypt.compare(req.body.password,user.password)
        if(isValid)
        {
            resp.redirect("home")
        }
        else
        {
            resp.render("login",{"err":"Invalid credentials"})
        }

    } catch (error) {
        resp.render("login",{"err":"Invalid credentials"})
    }
})

module.exports=router