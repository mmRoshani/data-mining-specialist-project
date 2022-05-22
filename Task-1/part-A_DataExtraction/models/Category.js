var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Category = new Schema({
    "Dk_id": Number,
    "title_fa": String,
    "title_en": String,
    "code": String,
    "logo": {
    "storage_ids": Object,
    "url": Array,
        "thumbnail_url": String | null,
        "temporary_id": String | null,
        "webp_url": Array
    },
    "url": {
    "base": String | null,
        "uri": String
    },
});

module.exports = mongoose.model('Categories', Category );