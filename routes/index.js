var express = require('express');
var router = express.Router();
var request = require('request');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather App',
    apiKey: process.env.KEY
  });
});

router.post('/weather', function(req, res, next) {
  console.log("in post");
  request(`http://api.openweathermap.org/data/2.5/forecast?lat=${process.env.LAT}&lon=${process.env.LON}&appid=${process.env.apiKey}`,
    function (error, response, body) {
      if (error) {
        console.log("Error!  Request failed - " + error);
      } else if (!error && response.statusCode === 200) {
        console.log("response", response);
        res.send(response)
      }
  });
});

module.exports = router;
