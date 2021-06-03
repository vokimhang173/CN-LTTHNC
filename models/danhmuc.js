var mongoose = require("mongoose");

var schemaDm = new mongoose.Schema({
    Title: String,
    //List: [{type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model("danhmuc", schemaDm);