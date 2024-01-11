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
                    _id : cartdata[i]._id,
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

        const allcart = await Cart.find({uid:uid})

        const found = allcart.find(ele=>{
            return ele.pid==pid
        })

        if(found)
        {
           // resp.send("product alredy exist in cart")
           cqty = found.qty+1;
         
           const dt = await Cart.findByIdAndUpdate(found._id,{qty:cqty})
           resp.send("Prodcut added into cart successfully !!!");
        }
        else
        {
        const cart = new Cart({uid : uid,pid:pid,qty:qty})
        const dt = await cart.save();
        resp.send("Prodcut added into cart successfully !!!");
        }
    } catch (error) {
        
    }
})
const Razorpay = require('razorpay');

router.get("/payment",(req,resp)=>{

    const amt = Number(req.query.amt)
    
    var instance = new Razorpay({ key_id: 'rzp_test_5IpPavBJK9DDzS', key_secret: '2zzNHHi2Af9iHWp6nah9QbPD' })

    var options = {
      amount: amt*100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function(err, order) {
      resp.send(order)
    });

})

const Order = require("../model/order")
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chintan.tops@gmail.com',
    pass: 'gwxi mmoo mkqg zabq'
  }
});


router.get("/order",auth,async(req,resp)=>{
    try {
        const pid = req.query.pid
        const user = req.user

        const allCartProd = await Cart.find({uid:user._id})
        var products = [];
        var str = "";
        for(var i=0;i<allCartProd.length;i++)
        {
            const pdata = await Product.findById(allCartProd[i].pid)
           
            products[i] = {
                pname : pdata.name,
                price : pdata.price,
                qty : allCartProd[i].qty
                
            }
            str = str+"<tr><td>"+pdata.name+"</td><td>"+pdata.price+"</td><td>"+allCartProd[i].qty+"</td></tr>"
        }

       const order = new Order({uid:user._id,pid:pid,product:products})
       const o =  await order.save();
       
       var mailOptions = {
        from: 'chintan.tops@gmail.com',
        to: user.email,
        subject: 'Order Conformation',
        html: "<h1>Your Order</h1><table border='1'><tr><th>ProductName</th><th>Product Price</th><th>Qty</th></tr>"+str+"</table>"
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


      await Cart.deleteMany({uid:user._id});


       resp.send("order confirm")

    } catch (error) {
        
    }

})


router.get("/deletefromcart",auth,async(req,resp)=>{
    try {
        const id = req.query.cartid
        await Cart.findByIdAndDelete(id);
        resp.send("product deleted")
    } catch (error) {
        
    }
})

router.get("/changeqty",async(req,resp)=>{
    try {
        const cartid  =req.query.cartid
        const qty = req.query.qty

        const cartdata = await Cart.findById(cartid)

       

        const newqty = Number(cartdata.qty)+Number(qty);

        if(newqty==0)
        {
            return;
        }

        await Cart.findByIdAndUpdate(cartid,{qty:newqty});

        resp.send("qty updated")


    } catch (error) {
        
    }
})

module.exports = router