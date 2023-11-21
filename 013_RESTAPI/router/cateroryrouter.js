
const router = require("express").Router()
const Category = require("../model/categories")
const auth = require("../middleware/auth")

router.get("/",auth,async(req,resp)=>{
    
    try {
        const data = await Category.find();
        resp.send(data);
    } catch (error) {
        resp.send(err)
    }


})

router.post("/",auth,async(req,resp)=>{
    try {
        
        const cat = new Category(req.body)
        const data = await cat.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
    

})

router.put("/:id",async(req,resp)=>{
   
    const id = req.params.id;
    try {
        
       const dt =  await Category.findByIdAndUpdate(id,req.body);
       resp.send(dt)

    } catch (error) {
        console.log(error);
    }

})

router.delete("/:id",async(req,resp)=>{
    
    const id = req.params.id
    try {
        const dt = await Category.findByIdAndDelete(id);
        resp.send(dt)
    } catch (error) {
        console.log(error);
    }


})

router.get("/:id",async(req,resp)=>{
    
    const id = req.params.id
    try {
        const dt = await Category.findById(id);
        resp.send(dt)
    } catch (error) {
        console.log(error);
    }


})


module.exports=router