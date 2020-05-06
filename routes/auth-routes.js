"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");

// Auth log in
router.get("/login", (req, res) => {
    res.render("login");
});

// Auth log out
router.get("/logout", (req, res) => {
    // Handle with Passport
    req.logOut();
    res.redirect("/");
});

// Auth with Google
router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

// CB route for Google to redirect to
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile/");
});

module.exports = router;