
const router = require("express").Router()
const Admin = require("../model/admins")
const jwt = require("jsonwebtoken")
const aauth = require("../middleware/aauth")
const multer = require("multer")
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "./public/pimage") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
}) 

var upload = multer({
    storage:storage
}).single("img")
    
router.get("/admin",(req,resp)=>{
    resp.render("adminlogin")
})

router.get("/adminhome",aauth,(req,resp)=>{
    resp.render("adminhome")
})

router.post("/adminlogin",async(req,resp)=>{
    try {
        
            const admin = await Admin.findOne({email:req.body.email})

            if(admin.pass==req.body.pass)
            {
                const token = await jwt.sign({_id:admin.id},process.env.SKEY)
                resp.cookie("ajwt",token)
                resp.redirect("adminhome")
            }
            else{
                resp.render("adminlogin",{err:"Invalid credentials"})
            }

    } catch (error) {
        resp.render("adminlogin",{err:"Invalid credentials"})
    }
})

//************************************ */
const Category = require("../model/categories")

router.get("/category",async(req,resp)=>{
    try {
        
        const catdata = await Category.find();
        resp.render("category",{catdata:catdata})
    } catch (error) {
        
    }
   
})

router.post("/addcategory",async(req,resp)=>{
    try {
        const cat = new Category(req.body)
        await cat.save();
        resp.redirect("category")
    } catch (error) {
        
    }

})

//*********product */
const Product = require("../model/products")
router.get("/product",async(req,resp)=>{

    try {
        
        const catdata = await Category.find();
        const pdata = await Product.find();
        
        resp.render("product",{catdata:catdata,pdata:pdata})
    } catch (error) {
        
    }
})

router.post("/addproduct",upload,async(req,resp)=>{
    try {
        
        const prod = new Product({catid:req.body.catid,name:req.body.name,price:req.body.price,qty : req.body.qty,img : req.file.filename});
        const data = prod.save();
        resp.redirect("product")
    } catch (error) {
        
    }
})


module.exports=router