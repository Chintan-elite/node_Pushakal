const express = require("express")
const app = express()
const PORT = 9000;
const path = require("path")
const geocode = require("./geocode")
const weather = require("./weather")

const publicpath = path.join(__dirname,"public")
app.use(express.static(publicpath))
app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"index.html"))
})

app.get("/weather",(req,resp)=>{

    const city = req.query.location;
    geocode.getGeoCode(city,(data,err)=>{

        if(err)
        {
            console.log(err);
            return;
        }

        
        weather.getWeatherData(data.lat, data.lng,(result,err)=>{


            // console.log(`
            
            // City : ${result.city},
            // Lat : ${data.lat}
            // Lng : ${data.lng}
            // Temp : ${result.temp}
            // Pressure : ${result.pressure}
            // Humidity : ${result.humidity}
            
            
            
            // `);

            resp.send({
                City : result.city,
                Lat : data.lat,
                Lng : data.lng,
                Temp : result.temp,
                Pressure : result.pressure,
                Humidity : result.humidity
            })



        });

})


})

app.listen(PORT,()=>{
    console.log("Server running on port  : "+PORT);
})

