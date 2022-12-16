const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

//set
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//weather muutujad
const key = 'a23e25bc421ba3eb2540db15a33dd6a7'
let city = 'Berlin'
//

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//promise
const getWeatherDatPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(responce => {
                return responce.json()
            })
            .then(data => {
                let description = data.weather[0].description
                let city = data.name
                let temp = Math.round(parseFloat(data.main.temp) - 273.15)
                let result = {
                    description: description,
                    city: city,
                    temp: temp
                }
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}


//get







app.all('/', function (req, res){
    let city
    if(req.method == 'GET'){
        city = 'Tartu'
    }
    if(req.method == 'POST'){
        city = req.body.cityname
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    getWeatherDatPromise(url)
        .then(data => {
            res.render('index', data)
        })
})
app.listen(3000)