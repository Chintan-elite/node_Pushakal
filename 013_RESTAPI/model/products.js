const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    pname : {
        type : String
    },
    price : {
        type : Number
    },
    qty : {
        type : Number
    },
    img : {
        type : String
    },
    catid :{
        type : mongoose.Schema.Types.ObjectId
    }

})

module.exports=new mongoose.model("Product",productSchema)