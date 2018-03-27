var express = require('express');
var router = express.Router();
const passport = require('passport');

/*
router.get('/', function(req, res){
  res.send('Check user', {user: req.user});
});
*/

// auth login
router.get('/login', function (req, res, next) {
  res.render('login');
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/login' }),
  function (req, res) {
    res.redirect('/');
  });

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
})

// auth with goole
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), function (req, res, next) {
  //res.send(req.user)
  res.redirect('/users/profile/')
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile', 'email', 'user_hometown']
}));


module.exports = router;