const jwt = require("jsonwebtoken")
const User = require("../model/users")

const auth = async(req,resp,next)=>{

    try {
        
        const token =  req.cookies.ajwt
        
        const data =  await jwt.verify(token,process.env.SKEY);
        
      
        if(data){
       
            //req.user = userdata;
            req.token = token
            next()
        }

    } catch (error) {
        
       resp.render("adminlogin",{err:"Please login first"})

    }


}


module.exports=auth