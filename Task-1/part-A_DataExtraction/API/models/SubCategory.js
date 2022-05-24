var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubCategories = new Schema({
    "DK_ID": Number,
    "title_fa": String,
    "title_en": String,
    "code": String,
    "image": {
    "storage_ids": Object,
    "url": Array,
        "thumbnail_url": String | null,
        "temporary_id": String | null,
        "webp_url": Array
    },
    "top_product_image": String | null,
    "products_count": Number,
    "url": {
    "base": String | null,
        "uri": String
    },
    modify_date: Date,
    mainCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    }

});

module.exports = mongoose.model('sub_categories', SubCategories );