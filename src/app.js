const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew F'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew F'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'some help for you',
        name: 'Andrew F'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) { 
        return res.send({
            error: 'You must provide an address!'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) 
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

}) 

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error:'you must provide a search term.'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Help page does not exist',
        name: 'Andrew F'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 page not found',
        name: 'Andrew F'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})