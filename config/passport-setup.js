const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        done(null, user)
    })
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('passport callback fucntion fired');
        console.log(profile);
        // check if user already exits in out db
        User.findOne({
            google_id: profile.id
        }).then(function (currentUser) {
            if (currentUser) {
                // already have the user
                console.log('user already exits', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user
                new User({
                    username: profile.displayName,
                    google_id: profile.id
                }).save().then(function (newUser) {
                    console.log('new user created' + newUser);
                    done(null, newUser);
                })
            }
        });
    })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    callbackURL: '/auth/facebook/callback'
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
    }
));

passport.use(new LocalStrategy(
    function (username, password, cb) {
        User.findOne({username: username}, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));