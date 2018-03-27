var express = require('express');
var User = require('../models/user');
var router = express.Router();

var authCheck = function (req, res, next) {
  if (!req.user) {
    // if user not logged in
    res.redirect('/auth/login');
  }
  else {
    // if user logged in
    next();
  }
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', authCheck, function (req, res, next) {
  //res.render('profile')
  res.render('profile', { user: req.user });
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res, next) {
  console.log(req.body);

  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    image_path: 'uploads/user-profile-default.png',
    privilege: 'user',
    email: req.body.email,
    social_media: {
      facebook: req.body.facebook,
      line: req.body.line,
      instagram: req.body.instagram
    }
  });
  newUser.save().then(function() {
    console.log('User saved');
    res.redirect('/');
  })
  /*
  var newUser = User(req.body).save(function(err, data) {
    if (err) throw err;
  });
  */
  // next();
});

module.exports = router;
