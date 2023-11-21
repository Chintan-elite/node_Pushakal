const router = require("express").Router()
const { response } = require("express");
const User = require("../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
router.get("/",async(req,resp)=>{
    
    try {
        const data = await User.find();
        resp.send(data);
    } catch (error) {
        resp.send(err)
    }


})

router.post("/",async(req,resp)=>{
    try {
        
        const user = new User(req.body)
        
        const data = await user.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
    

})

router.put("/:id",async(req,resp)=>{
   
    const uid = req.params.id;
    try {
        
       const dt =  await User.findByIdAndUpdate(uid,req.body);
       resp.send(dt)

    } catch (error) {
        console.log(error);
    }

})

router.delete("/:id",async(req,resp)=>{
    
    const uid = req.params.id
    try {
        const dt = await User.findByIdAndDelete(uid);
        resp.send(dt)
    } catch (error) {
        console.log(error);
    }


})

router.get("/:id",async(req,resp)=>{
    
    const uid = req.params.id
    try {
        const dt = await User.findById(uid);
        resp.send(dt)
    } catch (error) {
        console.log(error);
    }


})

router.post("/userlogin",async(req,resp)=>{
    try {
        
        const email = req.body.email
        const pass = req.body.pass

        const userdata = await User.findOne({email:email});

        const isValid =  await bcrypt.compare(pass,userdata.pass)
       
        if(isValid)
        {

            const token =  await jwt.sign({id:userdata._id},"thisismywebtokensecretkey")
            resp.send(`Welcome, ${userdata.uname} your token is : ${token}`)
        }
        else
        {
            resp.send("Invalid credentials")
        }


    } catch (error) {
       
        resp.send("Invalid credentials")
    }
})


module.exports=router