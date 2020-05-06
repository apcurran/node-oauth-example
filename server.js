"use strict";

require('dotenv').config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 5000;
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
// Routes
const authRoutes = require("./routes/auth-routes");

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to mongodb");
});

// Setup view engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Setup routes
app.use("/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.render("home");
});



app.listen(PORT, () => console.log(`Listening on port, ${PORT}.`));