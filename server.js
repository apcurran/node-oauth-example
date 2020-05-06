"use strict";

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config()

// Routes
const authRoutes = require("./routes/auth-routes");

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