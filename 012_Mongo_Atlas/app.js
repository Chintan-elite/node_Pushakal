const mongoose = require("mongoose")

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




const addUser = async ()=>{
    try {
        
        const u1 = new User({uname:"Pushkal",email:"pushkal@gmail.com",pass:"pushkal123"});
        const u2 = new User({uname:"Uday",email:"uday@gmail.com",pass:"uday123"})

        const insertedData = await User.insertMany([u1,u2]);
        console.log(insertedData);


    } catch (error) {
        console.log(error);
    }

}

addUser()

