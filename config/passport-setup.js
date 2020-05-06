"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy(
    {
        // Options for the Google Strat
        callbackURL: "/auth/google/redirect",
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback func
        console.log("passport callback fired");
        console.log(profile);
    })
);