let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let Comment = new Schema({
  DK_ID: Number,
  title: String | null,
  body: String | null,
  created_at: String | null,
  rate: Number,
  reactions:
    {
      likes: Number | null,
      dislikes: Number | null,
    } | null,
  files:
    [
      {
        storage_ids: [String | null] | null,
        url: [String | null] | null,
        thumbnail_url: [String | null] | null,
        temporary_id: null,
      } | null,
    ] | null,
  recommendation_status: String | null,
  is_buyer: Boolean | null,
  user_name: String | null,
  is_anonymous: Boolean | null,
  purchased_item:
    {
      seller:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "sellers",
        } | null,
      color:
        {
          id: Number | null,
          title: String | null,
          hex_code: String | null,
        } | null,
    } | null,
  advantages: [String | null],
  disadvantages: [String | null],
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub_categories",
  },
  modify_date: Date,
});

module.exports = mongoose.model("Comments", Comment);
