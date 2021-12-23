const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => { // Storing user info into a cookie and sent to the browser
    done(null, user.id);
})

passport.deserializeUser((id, done) => { // Passes cookie from the browser to find the user
    User.findById(id).then((user) => {
    done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => { // passport callback function after getting google account details.
        // Check if user already exists on database
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                // user already in the database
                console.log("This user currently exists...... ", currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in database
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => { // save is a mongoose async function used to save the user details from google
                    console.log("new user created: " + newUser);
                    done(null, newUser);
                });
            }
        })
    })
);