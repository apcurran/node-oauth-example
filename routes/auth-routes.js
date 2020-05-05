const express = require("express");
const router = express.Router();

// Auth log in
router.get("/login", (req, res) => {
    res.render("login");
});

// Auth log out
router.get("/logout", (req, res) => {
    // Handle with Passport
    res.send("logout");
});
// Auth with Google
router.get("/google", (req, res) => {
    // Handle with Passport
    res.send("Logging in with Google...");
});

module.exports = router;