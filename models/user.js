var mongoose = require("mongoose");

var schemaU = new mongoose.Schema({
    Username: String,
    Password: String
});

module.exports = mongoose.model("user", schemaU);