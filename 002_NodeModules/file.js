const { log } = require("console")
const fs = require("fs")

//fs.writeFileSync("demo.txt","this is my first file");

//fs.appendFileSync("demo.txt","123 this is my first file");

// const data =  fs.readFileSync("demo.txt","utf-8");
// console.log(data);

//fs.unlinkSync("demo.txt")

//fs.mkdirSync("test");

//fs.rmdirSync("test")


// fs.writeFile("data.txt","sun rises in east",(err,data)=>{
//         console.log("file created");
// })

// fs.readFile("data.txt","utf-8",(err,data)=>{
//     if(err)
//     {
//         return console.log(err);
//     }
//     console.log(data);
// })


//*************sync vs async*************
// const data =  fs.readFileSync("data.txt","utf-8");
// console.log(data);
// console.log("reading after file...");



fs.readFile("data.txt","utf-8",(err,data)=>{
    if(err)
    {
        return console.log(err);
    }
    console.log(data);
})
console.log("reading after file...");
