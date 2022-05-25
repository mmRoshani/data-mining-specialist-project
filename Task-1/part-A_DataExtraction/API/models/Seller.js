let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let Seller = new Schema({
  DK_ID: Number,
  title: String,
  code: String,
  url: String,
  rating:
    {
      total_rate: Number,
      total_count: Number,
      commitment: Number,
      no_return: Number,
      on_time_shipping: Number,
    } | null,
  properties:
    {
      is_trusted: Boolean,
      is_official: Boolean,
      is_roosta: Boolean,
      is_new: Boolean,
    } | null,
  stars: Number,
  registration_date: String,

  modify_date: Date,
});

module.exports = mongoose.model("Sellers", Seller);
