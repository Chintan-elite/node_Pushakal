const bcrypt = require("bcryptjs")


const hashPass = async (pass)=>{

    const newPass = await bcrypt.hash(pass,10)
   // console.log(newPass);

    const isValid =  await bcrypt.compare("hello@123",newPass);
    console.log(isValid);
}


hashPass("hello@123");
