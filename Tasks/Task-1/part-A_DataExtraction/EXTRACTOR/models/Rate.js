var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Rate = new Schema({
  id: Number,
  title: String,
  value: Number,
});

module.exports = mongoose.model("rtes", Rate);
