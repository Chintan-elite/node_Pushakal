const express = require("express")
const app = express();
require("dotenv").config()
const PORT = process.env.PORT || 3000
const path = require("path")
const hbs= require("hbs")

const viewpath = path.join(__dirname,"../templetes/views")
const partialpath = path.join(__dirname,"../templetes/partials")

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialpath)



app.use("/",require("../router/userrouter"))


app.listen(PORT,()=>{
   // console.log("Server runningon port"+PORT);
   console.log(`Server running on port ${PORT}`);
})

