const axios = require("axios");
const { log } = require("console");

const url = "https://restcountries.com/v3.1/all"

axios.get(url).then(result=>{

    const dt = result.data;

    for(var i=0;i<dt.length;i++)
    {
        console.log(dt[i].name.common);
    }


}).catch(err=>{
    console.log(err);
})

