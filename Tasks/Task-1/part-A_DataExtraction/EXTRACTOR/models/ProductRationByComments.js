var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductRationByComments = new Schema({
  ratings:
    {
      id: Number | null,
      title: String | null,
      value: Number | null,
    } | null,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sub_categories",
  },
  modify_date: Date,
});

module.exports = mongoose.model(
  "product_ration_by_comments",
  ProductRationByComments
);
