const express = require("express")
const app = express()
const port = 3000
const multer = require("multer")


var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "img") 
    }, 
    filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".jpg") 
    } 
}) 

var upload = multer({
    storage:storage
}).single("image")
    


app.post("/upload",upload,(req,resp)=>{


            console.log(req.file.filename);


})

app.listen(port,()=>{
    console.log("server runinng on port : "+port);
})
