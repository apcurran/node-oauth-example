"use strict";

require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 5000;
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
// Routes
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Setup view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});


app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));