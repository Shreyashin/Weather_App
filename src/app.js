const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        Info : 'Use this app to see the Weather.',
        name: 'Shreyash Indurkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shreyash Indurkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the Help desk. How Can I hep you??',
        name: 'Shreyash Indurkar'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, Data )=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: Data,
                location: place_name,
                address: req.query.address
            })
        })
    })
    
})



app.get('/help/*', (req, res) => {
    res.render('error', {
        message: "Help Article not found",
        title: '404',
        name: 'Shreyash'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found',
        title: '404',
        name: 'Shreyash'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})