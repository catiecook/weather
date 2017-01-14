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

router.post('/:lat/:long', function(req, res, next) {
  request(`http://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.long}&${process.env.apiKey}`,
    function (error, response, body) {
      if (error) {
        console.log("Error!  Request failed - " + error);
      } else if (!error && response.statusCode === 200) {
        res.send(response)
      }
  });
});

module.exports = router;
