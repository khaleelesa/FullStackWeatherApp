// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/CityDB', { useNewUrlParser: true })

app.use('/', api)

const port = 3000
app.listen(port, function() {
    console.log(`Running on port ${port}`)
})