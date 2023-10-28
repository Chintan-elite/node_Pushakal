const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient


const url = "mongodb://localhost:27017/";


MongoClient.connect(url).then(data=>{

    console.log("connection established");
    const db =  data.db("pushakal")
    console.log("db connected");


    // db.createCollection("emp").then(data=>{
    //     console.log("collection created");
    // })

    // const bk1 = {name:"Node",price:5000,qty:10};
    // db.collection("book").insertOne(bk1).then(data=>{
    //     console.log(data);
    // })


    // const bk1 = {Name:"SQL",price:1500,qty:1}
    // const bk2 = {name:"C",price:5,qty:5};
    // db.collection("book").insertMany([bk1,bk2]).then(data=>{
    //     console.log(data);
    // })

    // db.collection("book").find().toArray().then(data=>{
    //     console.log(data);
    // })


    // db.collection("book").findOne({Name:"SQL"}).then(data=>{
    //     console.log(data);
    // }).catch(err=>{
    //     console.log(err);
    // })





}).catch(err=>{
    console.log(err);
})