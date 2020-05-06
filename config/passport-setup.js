"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
    done(null, user.id); // user id from mongodb
});

passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy(
    {
        // Options for the Google Strat
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
        User
        .findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                console.log(profile._json.picture);
                // Already have the user
                done(null, existingUser);
            } else {
                // If not, create user in db
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile.picture
                })
                .save()
                .then(newUser => done(null, newUser));
            }
        })

    })
);