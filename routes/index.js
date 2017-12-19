var express = require('express')
var router = express.Router()


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect('/users/' + req.session.user)
  }
  res.render('index', { title: 'gClassified' })
})

router.get('/logout', (req,res,next) => {
  req.session.user = null;
  res.redirect('/')
})


module.exports = router
