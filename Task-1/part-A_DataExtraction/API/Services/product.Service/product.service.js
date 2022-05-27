let SubCategory = require("../../models/SubCategory");
let Product = require("../../models/Products");
let publisher = require("../../messaging/publisher.messaging");
let rabbitQmEnum = require("../../DataStructures/publisher.enum");

async function productExtractor(data) {
  let result;
  subCategoryCode = data.code;
  let page = 1;
  if (data.page) page = data.page;

  let _subCategory = await SubCategory.findOne({
    code: subCategoryCode,
  }).exec();

  if (!_subCategory) {
    return "subcategory not founded!";
  }
  if (page > 100) {
    return "bounder's error:data unavailable";
  }

  result = await Product.find({
    subCategory: _subCategory,
  })
    .sort({ DK_ID: +1 })
    .limit(page * 20)
    .exec();

  (async () => {
    try {
      const _message_product = {
        task: "ExtractProduct",
        data: JSON.stringify({ subCategoryId: _subCategory._id }),
        data_type: "subCategory",
      };
      await publisher(
        rabbitQmEnum.EXCHANGE,
        rabbitQmEnum.QUEUE_PRODUCT,
        rabbitQmEnum.ROUTING_COMMENT,
        JSON.stringify(_message_product)
      );
    } catch {}
  })();

  (async () => {
    try {
      const _message_comment = {
        task: "ExtractProductComments",
        data: JSON.stringify({ subCategoryId: _subCategory._id }),
        data_type: "subCategory",
      };
      await publisher(
        rabbitQmEnum.EXCHANGE,
        rabbitQmEnum.QUEUE_COMMENT,
        rabbitQmEnum.ROUTING_COMMENT,
        JSON.stringify(_message_comment)
      );
    } catch {}
  })();

  return result;
}

module.exports = {
  productExtractor,
};
