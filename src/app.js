const express = require('express')
const path = require('path')
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)
const publicDirectory = path.join(__dirname,"../public")
const viewPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,'../templates/partials')

const appDetails = {
    name : 'Weather App',
    displayName: 'My Weather',
    version: '1.0',
    year: '2019',
    author : {
        name : 'Ranjith',
        email: 'ranjithraj.d@gmail.com'
    }    
}
//handlebars
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//static directory
app.use(express.static(publicDirectory))
//get(route,callback)
app.get('',(req,res)=>{
    res.render('index',{
        appDetails : appDetails,
        content : "Weather report"        
    })
})
app.get('/doc',(req,res)=>{
    res.render('doc',{
        appDetails: appDetails        
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        appDetails : appDetails,
    })
})

app.get('/api',(req,res)=>{
    res.send({
        api:'welcome',
        version:'1.0'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
          message: "please provide search"
        })
    }

    geoCode(req.query.address,(geoError,geoData) => {            
        if(geoError){
            res.send({
                error: {
                    code : 'W-121',
                    message : geoError
                }
            })
        }else{
            forecast(geoData,(weatherError,weatherData)=> {
                if(weatherError){
                    res.send({
                        error: {
                            code : 'W-122',
                            message : geoError
                        }
                    })
                }else{
                    res.send(weatherData)
                }
            })
        }        
    })
})
app.get('/weather/*',(req,res)=>{
    res.render('404')
})
//wildcard should be at last
app.get('*',(req,res)=>{
    res.send('Resource not found')
})
app.listen('3000',()=>{
    console.log('server started')
})