const router = require("express").Router()
const { log } = require("console")
const Product = require("../model/products")
const multer = require("multer")
const path = require("path")

const mypath = path.dirname(__dirname) 
const imgPath = path.join(mypath,"productImg")
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "productImg") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
}) 

var upload = multer({
    storage:storage
}).single("image")
    


router.post("/",upload,async(req,resp)=>{

    try {
        
            const product = new Product({
                pname : req.body.pname,
                price : req.body.price,
                qty : req.body.qty,
                img : imgPath+"\\"+req.file.filename,
                catid : req.body.catid
            })

            const data = await product.save()
            resp.send(data)


    } catch (error) {
        resp.send(error)
    }


})

router.get("/",async(req,resp)=>{
    try {
        const data = await Product.find()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})


module.exports=router