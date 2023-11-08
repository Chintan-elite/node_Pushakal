const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
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


userSchame.pre("save",async function(){

    try {
        
    this.pass = await bcrypt.hash(this.pass,10);

    } catch (error) {
        console.log(error);
    }

})

module.exports =  new mongoose.model("User",userSchame)