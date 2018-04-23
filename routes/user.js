var express = require("express");
var multer = require("multer");
var path = require("path");
var User = require("../models/user");
var router = express.Router();

// set storage engine
var storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// init upload
var upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("profile_image");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return cb(null, true);
  }
  else {
    cb('Error: Image Only');
  }
}

var authCheck = function(req, res, next) {
  if (!req.user) {
    // if user not logged in
    res.redirect("/auth/login");
  } else {
    // if user logged in
    next();
  }
};

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.redirect("/");
});

router.get("/profile", authCheck, function(req, res, next) {
  res.render("user/profile", { user: req.user });
});

router.get("/list-users", authCheck, function(req, res, next) {
  if (req.user.privilege == "admin") {
    User.find({}, function(err, data) {
      if (err) throw err;
      console.log(data);
      res.render("user/list_user", { users: data, user: req.user });
    });
  } else res.send("You are not have permission to view this page");
});

router.get("/register", function(req, res, next) {
  res.render("user/register");
});

router.post("/register", function(req, res, next) {
  var newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    nickname: "-",
    username: req.body.username,
    password: req.body.password,
    image_path: "uploads/user-profile-default.png",
    privilege: "user",
    approved: "waiting",
    email: req.body.email,
    social_media: {
      facebook: req.body.facebook,
      line: req.body.line,
      instagram: req.body.instagram
    },
    address: {
      district: "-",
      province: "-"
    }
  });
  newUser.save().then(function() {
    console.log("User saved");
    res.redirect("/");
  });
});

router.post("/profile/change_img", authCheck, function(req, res, next) {
  console.log("enter change img");
  upload(req, res, err => {
    if (err) {
      res.render(profile);
    } else {
      console.log(req.file);
      console.log("req.file.path : " + req.file.path);
      let image_path = req.file.path;
      image_path = image_path.substr(7);
      User.findById(req.user.id, function(err, data) {
        if (err) return handleError(err);
        data.set({
          image_path: image_path
        });
        data.save(function(err, updatedUser){
          if (err) handleError(err);
          res.redirect('/user/profile');
        });
      });
    }
  });
});

router.post("/profile/editinfo", authCheck, function(req, res, next) {
  console.log("enter chage profile");
  console.log(req.user.id);

  User.findById(req.user.id, function(err, data) {
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
        province: req.body.province
      }
    });
    data.save(function(err, updatedUser) {
      if (err) return handleError(err);
      res.redirect("/user/profile");
    });
  });
});

router.post("/profile/:id", function(req, res, next) {
  var user_id = req.params.id;
  console.log(user_id);
  console.log("name of btn " + req.body.input_btn);
  var input_btn = req.body.input_btn;
  if (input_btn == "view_profile") {
    User.findById(user_id, function(err, data) {
      if (err) return handleError(err);
      res.render("user/profile", { user: data });
    });
  } else if (input_btn == "delete") {
    User.findByIdAndRemove(user_id, function(err, user) {
      if (err) return res.status(500).send(err);
    });
    res.redirect("/user/list-users");
  } else if (input_btn == "update") {
    User.findById(user_id, function(err, data) {
      if (err) return handleError(err);
      data.set({
        approved: req.body.approved
      });
      data.save(function(err, updatedUser) {
        if (err) return handleError(err);
        res.redirect("/user/list-users");
      });
    });
  }
});

module.exports = router;
