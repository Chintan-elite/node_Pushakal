const mongoose = require("mongoose")

const url = "mongodb://localhost:27017/practice";

mongoose.connect(url).then(data=>{
    console.log("DB connected");
}).catch(err=>{
    console.log(err);
})


const Category = require("./categories")
const Product = require("./products")

const addCatergory = async ()=>{
    try {
        

        const c1 =new Category({catname : "Electric"})
        const c2 = new Category({catname:"Clothes"})
        const c3 =new Category( {catname:"Sports"})

        const cat =  await Category.insertMany([c1,c2,c3]);
        console.log(cat);
    } catch (error) {
        console.log(error);
    }
}

const addProduct = async()=>{
    try {
        
        const p1 = new Product({pname:"Fan",price:600,qty:10,catid:"6540d55ce0464b07383059b2"})
        const p2 = new Product({pname:"Lamp",price:60,qty:100,catid:"6540d55ce0464b07383059b2"})
        const p3 = new Product({pname:"Laptop",price:6000,qty:20,catid:"6540d55ce0464b07383059b2"})
        const p4 = new Product({pname:"Shirt",price:560,qty:100,catid:"6540d55ce0464b07383059b3"})
        const p5 = new Product({pname:"T-shirt",price:600,qty:150,catid:"6540d55ce0464b07383059b3"})
        const p6 = new Product({pname:"Bat",price:600,qty:150,catid:"6540d55ce0464b07383059b4"})

        const dt = await Product.insertMany([p1,p2,p3,p4,p5,p6]);
        console.log(dt);



    } catch (error) {
        
    }
}


const viewProduct = async()=>{

    try {
        
       // const data = await Product.find()
        const data = await Product.aggregate([{$lookup:{
            from : "categories",
            localField :"catid" ,
            foreignField : "_id",
            as : "category"
        }}])


        for(var i=0;i<data.length;i++)
        {
            //console.log(data[i]);

            console.log(data[i].pname+" "+data[i].category[0].catname);
        }

    } catch (error) {
        console.log(error);
    }


}


//addCatergory();
//addProduct();
viewProduct()