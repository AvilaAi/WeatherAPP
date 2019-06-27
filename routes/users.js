var express = require('express');
var router = express.Router();
const userModel = require("../model/user.js");
var session = require("express-session");

/* GET users listing. */
router.post('/sign-up', function(req, res, next) {
  // console.log(req.body);
  userModel.findOne({
    email: req.body.emailFromFront
  }, function(err, user) {
    if (!user) {
      var newUser = new userModel({
        username: req.body.usernameFromFront,
        email: req.body.emailFromFront,
        password: req.body.passwordFromFront,
      });
      newUser.save(function(err, user) {
        // if (error) {
        //   console.log(error);
        // }
        console.log(user);
        req.session.user = user;
        res.redirect('/cities');
      });

    } else {

      console.log("user exist");
      res.redirect("/");

    };
  });

});

router.post('/sign-in', function(req, res, next) {
  userModel.findOne({
    email: req.body.emailFromFront.toLowerCase()
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user && req.body.emailFromFront.length > 0 && user.password == req.body.passwordFromFront) {
      req.session.user = user;
      res.redirect("/cities")
    } else {
      res.redirect("/")
    }
  })


});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
