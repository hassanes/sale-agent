var express = require('express');
var User = require('../models/user')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  User.find({privilege: 'user'}, function(err, data){
    if (err) throw err;
    res.render('index', {users: data, user: req.user});
  });
});


module.exports = router;
