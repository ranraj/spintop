const request = require('request')
const geoCode = (address,callback) =>{
    const apiBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoicmFuaml0aHJhamQiLCJhIjoiY2szeDFiMTYxMDd0ejNkczh4Ymk1c2liaSJ9.G-BCDyqBN3uLpCBPp_Hf7Q&limit=1'
    request({url: apiBoxUrl,json:true},(error,response,body)=>{
            if(error){        
                callback("Unable to connect",undefined)
            }else if(response.body.error){
                callback("failed to find the location",undefined)
            }else if(response.body.features.length == 0 ){
                callback("location is not found",undefined)
            }else{  
                let data = null
                if(body.features.length != 0){
                    data = {                    
                        longitude:body.features[0].center[0],
                        latitude:body.features[0].center[1],
                        name : body.features[0].text
                    }
                }
                callback(undefined,data)
            }
    })
}

module.exports = geoCode