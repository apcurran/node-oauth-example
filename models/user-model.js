"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    googleId: { type: String }
});

module.exports = mongoose.model("User", UserSchema);