var mongoose = require("mongoose");

var schemaSp = new mongoose.Schema({
    Name: String,
    Image: String,
    Cost: Number,
    Mota: String,
    Category_id: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model("product", schemaSp);