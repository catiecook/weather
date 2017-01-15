var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather App',
    apiKey: process.env.KEY,
    geoApi: process.env.GEOAPI
  });
});

router.post('/weather', function(req, res, next) {
  console.log("weather route");
  request(`http://api.openweathermap.org/data/2.5/forecast?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.KEY}`,
    function (error, response, body) {
      if (error) {
        console.log("Error!  Request failed - " + error);
      } else if (!error && response.statusCode === 200) {
        let weather = JSON.parse(response.body )
        res.json(weather)
      }
  });
});

module.exports = router;
