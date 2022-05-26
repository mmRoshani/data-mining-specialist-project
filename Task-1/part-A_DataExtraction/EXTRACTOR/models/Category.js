var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Category = new Schema({
  DK_ID: Number,
  title_fa: String,
  title_en: String,
  code: String,
  logo: {
    storage_ids: Object,
    url: Array,
    thumbnail_url: String | null,
    temporary_id: String | null,
    webp_url: Array,
  },
  url: {
    base: String | null,
    uri: String,
  },
  modify_date: Date,
});

module.exports = mongoose.model("Categories", Category);
