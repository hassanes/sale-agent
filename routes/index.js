var express = require("express");
var User = require("../models/user");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  User.find({ privilege: "user", approved: "yes" }, function(err, data) {
    if (err) throw err;
    res.render("index", { users: data, user: req.user });
  });
});

router.get("/showcard/:id", function(req, res, next) {
  var user_id = req.params.id;
  console.log(user_id);
  User.findById(user_id, function(err, data) {
    if (err) return handleError(err);
    res.render("show_card", { user: data });
  });
});

module.exports = router;
