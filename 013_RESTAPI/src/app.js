const express = require("express")
const app = express()
const mongoose = require("mongoose")
const PORT = 9000
app.use(express.json())
const cors = require("cors")
app.use(cors())
const dburl = "mongodb+srv://test:test@cluster0.scnvtfb.mongodb.net/erp?retryWrites=true&w=majority"

mongoose.connect(dburl).then(data=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})


app.use("/users",require("../router/userrouter"))
app.use("/categories",require("../router/cateroryrouter"))
app.use("/products",require("../router/productrouter"))

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})
