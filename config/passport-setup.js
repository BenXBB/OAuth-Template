const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => { // passport callback function after getting google account details.
        // Check if user already exists on database
        User.findOne({googleId: profile.Id}).then((currentUser) => {
            if(currentUser) {
                // user already in the database
                console.log("This user currently exists...... ", currentUser);
            } else {
                // if not, create user in database
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => { // save is a mongoose async function used to save the user details from google
                    console.log("new user created: " + newUser);
                });
            }
        })
    })
);