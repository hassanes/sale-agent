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
  res.render('user/profile', { user: req.user });
});

router.get('/admin', authCheck, function(req, res, next){
  if (req.user.privilege == 'admin')
    res.send('This is admin page');
  else
    res.send('You are not have permission to view this page' );
});

router.get('/register', function (req, res, next) {
  res.render('user/register');
});

router.post('/register', function (req, res, next) {
  console.log(req.body);

  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: '-',
    username: req.body.username,
    password: req.body.password,
    image_path: 'uploads/user-profile-default.png',
    privilege: 'user',
    approved: 'waiting',
    email: req.body.email,
    social_media: {
      facebook: req.body.facebook,
      line: req.body.line,
      instagram: req.body.instagram
    },
    address: {
      district: '-',
      province: '-'
    }
  });
  newUser.save().then(function () {
    console.log('User saved');
    res.redirect('/');
  })
});

router.post('/profile/change_img', function (req, res, next) {
  console.log('enter change img');
  res.redirect('/');
})

router.post('/profile/editinfo', authCheck, function (req, res, next) {
  console.log('enter chage profile');
  console.log(req.user.id)

  User.findById(req.user.id, function (err, data) {
    if (err) return handleError(err);
    data.set({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nickname: req.body.nickname,
      email: req.body.email,
      social_media: {
        facebook: req.body.facebook,
        line: req.body.line,
        instagram: req.body.instagram
      },
      address: {
        district: req.body.district,
        province: req.body.province,
      }

    });
    data.save(function (err, updatedUser) {
      if (err) return handleError(err);
      res.redirect('/user/profile');
    })
  });

});

module.exports = router;
