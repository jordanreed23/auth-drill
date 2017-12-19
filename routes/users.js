var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')
const saltRounds = 10;

router.post('/signin', function(req, res, next) {
  db.signIn().then(function(agent) {
    //Use bcrypt to log in
    if (isMatch) {
      //Route to /Assignment
    } else {
      res.render('index', {
        title: 'gClassified',
        message: 'Incorrect login. Contents will self destruct'
      })
    }
  })
})

router.post('/signup', function(req, res, next) {
  db.checkIfExists(req.body.agentName).then(user => {
    if (user.length < 1) {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        req.body.password = hash
        db.signUp(req.body).then(agent => {
          res.render('index', {
            title: 'gClassified',
            message: 'Sign Up Successful'
          })
        })
      });
    } else {
      res.render('index', {title: 'gClassified', message: 'Username already exists'})
    }
  })
})

module.exports = router
