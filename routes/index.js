var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Weather App',
    apiKey: process.env.KEY,
    geoApi: process.env.GEOAPI
  });
});

module.exports = router;
