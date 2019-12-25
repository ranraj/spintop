console.log('index page')


const weatherForm = document.querySelector('form')
const weatherSearch = document.querySelector('input')
const weatherResult = document.querySelector('#result-1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = weatherSearch.value
    weatherResult.textContent = 'Loading..'

    fetch('/weather?address='+address).then((res)=>{
        debugger
        if(res.error){                       
            weatherResult.innerHTML = res.error          
        }else{
            res.json().then((data)=>{     
                if(data.error){
                    weatherResult.textContent = data.error.message              
                }  else{             
                    console.log(data)
                    weatherResult.textContent = "Temperature " + data.temperature + " degree Celsius"                       
                }                
            })
        }
    })
})