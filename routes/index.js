var express = require('express');
var router = express.Router();
var request = require('request');
require("../model/bdd.js");
const cityModel = require('../model/city.js');



router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/cities', function(req, res, next) {
  if (!req.session.user) {
    res.redirect("/")

  }
  cityModel.find(
    function(err, citiesFromDataBase) {
      res.render('index', {
        cityList: citiesFromDataBase,
        user:req.session.user
      });
    });
});



router.post('/add-city', function(req, res, next) {
  console.log("CITY ADDED : --->", req.body.addedCityFromFront);
  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.addedCityFromFront}&appid=ad885bdb100c10033fed349f76329489`, function(error, response, body) {
    body = JSON.parse(body);
    console.log("STEP 1 | HERE IS THE BODY ---> ", body)
    if (body.cod=='404') {
      cityModel.find(
        function(err, citiesFromDataBase) {
          console.log("STEP 3 | CITIES FOUND IN DB ---> ", citiesFromDataBase);
          res.render('index', {
            cityList: citiesFromDataBase,
              user:req.session.user
          });
        });
    } else {
      var newCity = new cityModel({
        name: body.name,
        desc: body.weather[0].description,
        img: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
        temp_min: body.main.temp_min,
        temp_max: body.main.temp_max,
        lat:body.coord.lat,
        lon:body.coord.lon
      });
      newCity.save(
        function(error, city) {
          console.log("STEP 2 | CITY SAVED ---> ", city)
          cityModel.find(
            function(err, citiesFromDataBase) {
              console.log("STEP 3 | CITIES FOUND IN DB ---> ", citiesFromDataBase);
              res.render('index', {
                cityList: citiesFromDataBase,
                  user:req.session.user
              });
            });
        });
    }
   
  });
});


router.get('/delete-city', function(req, res, next) {
  console.log("STEP 4 | CITY DELETED ID ---> ", req.query.id)
  cityModel.deleteOne(
      { _id: req.query.id},
      function(error) {
        console.log("STEP 5 | CITY SUCCESSFULLY DELETED")
        cityModel.find(
          function(err, citiesFromDataBase) {
            res.render('index', {
              cityList: citiesFromDataBase,
              user:req.session.user

            });
          });
      }
  );
});



module.exports = router;
