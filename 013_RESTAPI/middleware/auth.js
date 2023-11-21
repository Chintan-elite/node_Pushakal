const jwt = require("jsonwebtoken")


const auth = async(req,resp,next)=>{

    try {
        
        const token =  req.header("auth-token")
        const data =  await jwt.verify(token,"thisismywebtokensecretkey");

        if(data)
        {
            next()
        }

    } catch (error) {
        resp.send("invalid token")
    }


}


module.exports=auth