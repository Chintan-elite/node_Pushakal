const jwt = require("jsonwebtoken")


const auth = async(req,resp,next)=>{

    try {
        
        const token =  req.cookies.jwt
        
        const data =  await jwt.verify(token,process.env.SKEY);

        if(data)
        {
            next()
        }

    } catch (error) {
       resp.render("login",{err:"Please login first"})
    }


}


module.exports=auth