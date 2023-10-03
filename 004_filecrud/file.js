const { log } = require("console")
const fs = require("fs")


const createFile = (data)=>{

    const alldata = loaddata()

    const duplicate = alldata.find(ele=>{
        return ele.name == data.name
    })

    if(duplicate)
    {
        console.log("Name already exist !!!");
        return;
    }


    alldata.push(data)


    const jsondata = JSON.stringify(alldata)
    fs.writeFile("data.json",jsondata,(err,data)=>{
        console.log("File created...");
    })

}



const viewFile = ()=>{

       const alldata = loaddata()
       console.log(alldata);
       
}

const removedata = (name)=>{

    const alldata = loaddata()

    const abc = alldata.filter(ele=>{
        return ele.name != name;
    })
    
    const jsondata = JSON.stringify(abc)
    fs.writeFile("data.json",jsondata,(err,data)=>{
        console.log("data remove...");
    })
}


const loaddata = ()=>{
    try {
        const data = fs.readFileSync("data.json","utf-8")
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

module.exports={createFile,viewFile,removedata}