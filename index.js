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

//get
app.get('/', function (req, res){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((responce) => {
            return responce.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })



})

app.listen(3000)