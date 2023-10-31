const mongoose = require("mongoose")

const ProductScema = new mongoose.Schema({
    pname : {
        type : String
    },
    price : {
        type : Number
    },
    qty : {
        type:Number
    },
    catid : {
        type : mongoose.Schema.Types.ObjectId
    }
})

module.exports = new mongoose.model("Product",ProductScema)