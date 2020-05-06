"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String },
    googleId: { type: String },
    thumbnail: { type: String }
});

module.exports = mongoose.model("User", UserSchema);