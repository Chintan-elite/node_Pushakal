const express = require("express")
const app = express()
const mongoose = require("mongoose")
const path = require("path")
const hbs = require("hbs")
require("dotenv").config()
const PORT = process.env.PORT
const DBURL = process.env.DBURL
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(bodyParser())
app.use(cookieParser())
mongoose.connect(DBURL).then(result=>{
    console.log("DB connected");
})


const publicPath = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templetes/views")
const partialPath = path.join(__dirname,"../templetes/partials")

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicPath))


app.use("/",require("../router/userrouter"))
app.use("/",require("../router/adminrouter"))

app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})
