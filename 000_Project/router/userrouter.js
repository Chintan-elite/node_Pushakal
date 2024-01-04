const router = require("express").Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const Category = require("../model/categories")
const Product = require("../model/products")

router.get("/",async(req,resp)=>{

    try {
        const cdata = await Category.find();
        const pdata = await Product.find();
        resp.render("index",{cdata:cdata,pdata:pdata})
    } catch (error) {
        
    }
    
})

router.get("/contact",(req,resp)=>{
    resp.render("contact")
})

router.get("/shop-details",async(req,resp)=>{

    const pid = req.query.pid;
    try {
        
        const data = await Product.findById(pid)
        resp.render("shop-details",{pdata:data})
    } catch (error) {
        
    }
  
})

router.get("/shop-grid",(req,resp)=>{
    resp.render("shop-grid")
})



router.get("/login",(req,resp)=>{
    resp.render("login")
})

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})

//***********user********** */
const User = require("../model/users")

router.post("/adduser",async(req,resp)=>{

    try {
        const user = new User(req.body)
        const data = await user.save();
        resp.render("reg",{msg:"Registration successfully !!!"})
    } catch (error) {
        console.log(error);
    }
})

router.post("/userlogin",async(req,resp)=>{
    try {
        const user =await User.findOne({email:req.body.email})

        var isValid=await bcrypt.compare(req.body.pass,user.pass)

        if(isValid)
        {

            const token = await jwt.sign({_id:user._id},process.env.SKEY)
            resp.cookie("jwt",token)
            resp.redirect("/")
        }
        else{
            resp.render("login",{err:"Invalid credentials !!!!"})
        }


    } catch (error) {
        resp.render("login",{err:"Invalid credentials !!!!"})
    }
})

router.get("/logout",(req,resp)=>{
    resp.clearCookie("jwt")
    resp.redirect("/")
})

//****************cart******* */
const Cart = require("../model/carts")
router.get("/shoping-cart",auth,async(req,resp)=>{

    const uid = req.user._id;
    
    try {

            const cartdata = await Cart.find({uid:uid})

            var allcdata = [];
            var alltotal=0;
            for(var i=0;i<cartdata.length;i++)
            {
                const pdata = await Product.findById(cartdata[i].pid);
                var ptotal = pdata.price * cartdata[i].qty;
                alltotal += ptotal
                allcdata[i] = {
                    pid : pdata._id,
                    pname : pdata.name,
                    price : pdata.price,
                    qty : cartdata[i].qty,
                    img : pdata.img,
                    total : ptotal
                }
            }

            



        resp.render("shoping-cart",{pdata:allcdata,alltotal:alltotal})
    } catch (error) {
        
    }
   
})
router.get("/addtocart",auth,async(req,resp)=>{

    const uid = req.user._id
    const pid = req.query.pid;
    var qty = 1;
    try {
        const cart = new Cart({uid : uid,pid:pid,qty:qty})
        const dt = await cart.save();
        resp.send("Prodcut added into cart successfully !!!");
       
    } catch (error) {
        
    }
})

module.exports = router