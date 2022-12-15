const express = require('express')
const app = express()
const path = require('path')

//set
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))



//get
app.get('/', function (req, res){
    res.render('index')
})

app.listen(3000)