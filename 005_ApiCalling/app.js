const geocode = require("./geocode")
const weather = require("./weather")


var city = process.argv[2];
if(!city)
{
    console.log("Please enter city name");
    return;
}

geocode.getGeoCode(city,(data,err)=>{

        if(err)
        {
            console.log(err);
            return;
        }

        
        weather.getWeatherData(data.lat, data.lng,(result,err)=>{


            console.log(`
            
            City : ${result.city},
            Lat : ${data.lat}
            Lng : ${data.lng}
            Temp : ${result.temp}
            Pressure : ${result.pressure}
            Humidity : ${result.humidity}
            
            
            
            `);


        });

})