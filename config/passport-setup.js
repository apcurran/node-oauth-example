"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user-model");

passport.use(new GoogleStrategy(
    {
        // Options for the Google Strat
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
        .then(existingUser => {
            if (existingUser) {
                // Already have the user
                console.log(`User is ${existingUser}`);
            } else {
                // If not, create user in db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                })
                .save()
                .then(user => console.log(`New user created ${user}`));
            }
        })

    })
);