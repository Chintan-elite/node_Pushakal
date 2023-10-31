const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/ecom";

mongoose.connect(url).then(data=>{
    console.log("DB connected");
}).catch(err=>{
    console.log(err);
})


const productSchema = new mongoose.Schema({
    pname :{
        type : String,
        required:true,
        unique:true,
        //enum : ['Pen','Fan']
    },
    price : {
        type:Number
    },
    qty : {
        type : Number,
        //min:10,
        //max:100
    }
})

const Product = new mongoose.model("Product",productSchema)

const addProduct = ()=>{

        const prod = new Product({pname:"Mouse",price:"200",qty:"11"})
        prod.save().then(data=>{
            console.log(data);
        }).catch(err=>{
            console.log(err);
        })
}

const addManyProduct = ()=>{

        const p1 = new Product({pname:"Keyboard",price:500,qty:20})
        const p2 = new Product({pname:"speaker",price:1500,qty:2})
        const p3 = new Product({pname:"Earphone",price:50,qty:120})


        Product.insertMany([p1,p2,p3]).then(data=>{
            console.log(data);
        }).catch(err=>{
            console.log(err);
        })
}

const viewProduct = async()=>{

        // Product.find().then(data=>{
        //     console.log(data);
        // }).catch(err=>{
        //     console.log(err);
        // })

        //const data =  await Product.find();
        //const data = await Product.findOne({pname:"Mouse"})
        // const data =  await Product.find({price:{$gt:500}},{"price":1,"pname":1,_id:0});
        //const data = await Product.find({price:{$lt:500}})


        //console.log(data);

}


const updateProduct = async ()=>{

    // Product.updateOne({pname:"Fan"},{$set:{price:500}}).then(data=>{
    //     console.log(data);
    // }).catch(err=>{
    //     console.log(err);
    // })

   const dt = await Product.findByIdAndUpdate("653cdd9947d31f6320f284d0",{price:700})
    console.log(dt);
}



const deleteProduct =async ()=>{

    try {
       // const data = await Product.deleteOne({pname:"Fan"})
       const data = await Product.findByIdAndDelete('653cdeecdb7ef018694ee76f');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


//addProduct();
//addManyProduct()
//viewProduct()
//updateProduct()
deleteProduct()