var express = require('express');
var User = require('../models/user')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // var query = User.findOne({firstname: 'sadf'});
  // console.log(query);
  User.find({privilege: 'user'}, function(err, data){
    if (err) throw err;
    console.log(data);
    res.render('index', {users: data, user: req.user});
  });
});


module.exports = router;
