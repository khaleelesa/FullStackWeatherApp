const express = require('express')
const axios = require('axios');
const City = require('../model/City')
const router = express.Router()

router.get(`/city/:cityName`, async function(req, res) {
    const cityName = req.params.cityName
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=452f776e4d9394d786467b6c01239fae`)
        .then(function(response) {
            res.send(response.data)
        })
        .catch(function(error) {
            res.send(error)
        })
})

router.get('/cities', function(req, res) {

    City.find({}, function(err, city) {
        res.send(city)
    })
})

router.post('/city', function(req, res) {
    let city = new City(req.body)
    city.save()
    res.end()
})

router.delete('/city/:cityName', function(req, res) {
    let cityName = req.params.cityName
    City.deleteMany({ name: cityName }, function(err) {})
    res.end()
})


module.exports = router