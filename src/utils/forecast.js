const request = require('request')

const forecast = (geoCodeData,callback) => {
    const darkSkyUrl = 'https://api.darksky.net/forecast/15397381edd925e529c3fc9fc8b40fff/'+geoCodeData.latitude+','+geoCodeData.longitude+'?units=si'
    request({url: darkSkyUrl,json:true},(error,response,body)=>{
        if(error){        
            callback("Unable to connect",undefined)
        }else if(response.body.error){            
            callback("Unable to find the weather report",undefined)
        }else{
            callback(undefined, {
                temperature : body.currently.temperature,
                precipProbability:body.currently.precipProbability              
            })
        }
    })
}
module.exports = forecast
