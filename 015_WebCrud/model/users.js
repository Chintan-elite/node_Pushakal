const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({

    username : {
        type : String
    },
    email : {
        type : String   
    },
    password : {
        type : String
    },
    img : {
        type : String
    }
})


userSchema.pre("save",async function(){
    try {
        if(this.isModified("password"))
        {
            this.password = await bcrypt.hash(this.password,10);
        }
    } catch (error) {
        
    }
})

module.exports=new mongoose.model("User",userSchema)