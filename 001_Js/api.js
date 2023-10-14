


fetch("https://restcountries.com/v3.1/all").then(result=>{
    return result.json()
}).then(data=>{
    
        var options = "";
        for(var i=0;i<data.length;i++)
        {
            options = options+"<option>"+data[i].name.common+"</option>"
        }
        country.innerHTML = options 

}).catch(err=>{
    console.log(err);
})