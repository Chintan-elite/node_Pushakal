const exp = require("constants");
const express = require("express");
const app = express()
const PORT = 9000
const path = require("path")



const publicPath = path.join(__dirname,"public")
app.use(express.static(publicPath))

app.get("/",(req,resp)=>{
   // resp.send("Welcome to myweb")
   resp.sendFile(path.join(__dirname,"index.html"));
})

app.get("/about",(req,resp)=>{
    //resp.send("about page")
    // resp.json({
    //     name : "Pushkal",
    //     email : "pushakal@gmail.com"
    // })
    resp.sendFile(path.join(__dirname,"about.html"));
})

app.get("/contact",(req,resp)=>{
    // resp.send("Welcome to myweb")
    resp.sendFile(path.join(__dirname,"contact.html"));
 })

app.get("*",(req,resp)=>{
    resp.send("Page not found")
})


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})





