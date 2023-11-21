const jwt = require("jsonwebtoken")



const generateToken = async ()=>{

    const token = await jwt.sign({id:1,name:"Pushkal"},"thisismywebtokensecretkey");
    //console.log(token);

    const payload =  await jwt.verify(token,"thisismywebtokensecretkey")
    console.log(payload);
}

generateToken();