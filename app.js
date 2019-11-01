const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adharsh Viswanath'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About Me',
        name: 'Adharsh Viswanath'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'Help page.',
        title: 'Help',
        name: 'Adharsh Viswanath'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address is required!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{ // the callback function receives either error or data(destructured)
        if(error) return res.send({error: error})  

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) return res.send({error: error})

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        message: 'Help article not found!',
        title: '404',
        name: 'Adharsh Viswanath'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        message: 'Page not found!',
        title: '404',
        name: 'Adharsh Viswanath'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})