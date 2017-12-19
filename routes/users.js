var express = require('express')
var router = express.Router()
var db = require('../db/api')
var bcrypt = require('bcrypt')
var fs = require('fs');
const saltRounds = 10;

router.post('/signin', function(req, res, next) {
  db.signIn(req.body.agentId).then(function(agent) {
    if (agent.length < 1) {
      res.render('index', {message: 'Incorrect login. Contents will self destruct'})
    } else {
      bcrypt.compare(req.body.password, agent[0].password, function(err, response) {
        if (response) {
          console.log('success');
          res.render('assignment', {agent: req.body.agentId})
        } else {
          res.render('index', {
            title: 'gClassified',
            message: 'Incorrect login. Contents will self destruct'
          })
        }
      });
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
      res.render('index', {
        title: 'gClassified',
        message: 'Username already exists'
      })
    }
  })
})

router.post('/assignment', (req, res, next) => {
  fs.writeFile('./message.txt', req.body.message, function(err) {
    if (err) 
      return console.log(err);
    }
  );
  res.render('assignment', {message: 'message sent'})
})

module.exports = router
