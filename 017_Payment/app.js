const Razorpay = require('razorpay');
const express = require("express")
const app = express()
const port = 3000;

app.get("/",(req,resp)=>{
    resp.sendFile(__dirname+"/index.html")
})

app.get("/payment",(req,resp)=>{

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

app.listen(port,()=>{
    console.log("server running on port : "+port);
})



