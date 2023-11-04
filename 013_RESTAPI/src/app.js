const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 9000
app.use(express.json())
const dburl = "mongodb+srv://test:test@cluster0.scnvtfb.mongodb.net/erp?retryWrites=true&w=majority"

mongoose.connect(dburl).then(data=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})


const userSchame = new mongoose.Schema({
    uname : {
        type : String
    },
    email :{
        type : String
    },
    pass : {
        type : String
    }
})

const User = new mongoose.model("User",userSchame)


app.get("/users",async(req,resp)=>{
    
    try {
        const data = await User.find();
        resp.send(data);
    } catch (error) {
        resp.send(err)
    }


})

app.post("/users",async(req,resp)=>{
    try {
        
        const user = new User(req.body)
        const data = await user.save()
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
    

})

app.put("/users",(req,resp)=>{
    resp.send("Put calling")
})

app.delete("/users",(req,resp)=>{
    resp.send("Delete calling")
})



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
