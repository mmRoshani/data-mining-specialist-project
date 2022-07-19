let Product = require("../../models/Products");
let SubCategory = require("../../models/SubCategory");
let Comment = require("../../models/Comment");
let ProductRationByComments = require("../../models/ProductRationByComments");
let publisher = require("../../messaging/publisher.messaging");
let rabbitQmEnum = require("../../DataStructures/publisher.enum");

const totalCommentsOnSubCategory = async (data) => {
  let subCategory = await SubCategory.findOne({
    DK_ID: data.subCategory,
  }).exec();
  if (!subCategory) return "Product not found";
  let page = 1;
  if (data.page) page = data.page;
  if (page > 100) {
    return "bounder's error:data unavailable";
  }
  (async () => {
    try {
      const _message_product = {
        task: "ExtractAlProductComments",
        data: JSON.stringify({ subCategoryId: subCategory._id }),
        data_type: "subCategory",
      };
      await publisher(
        rabbitQmEnum.EXCHANGE,
        rabbitQmEnum.QUEUE_ALL_COMMENT_SUB_CATEGORY,
        rabbitQmEnum.ROUTING_ALL_COMMENT_SUB_CATEGORY,
        JSON.stringify(_message_product)
      );
    } catch {}
  })();

  let totalCommentsOnSubCategory = await Comment.find({
    subCategory: subCategory._id,
  })
    .limit(page * 10)
    .exec();
  return totalCommentsOnSubCategory;
};

const commentFetcher = async (data) => {
  let product = await Product.findOne({ DK_ID: data.productId }).exec();
  if (!product) return "Product not found";
  let page = 1;
  if (data.page) page = data.page;
  if (page > 100) {
    return "bounder's error:data unavailable";
  }
  (async () => {
    try {
      const _message_comment = {
        task: "ExtractProductComments",
        data: JSON.stringify({ productId: product._id }),
        data_type: "productId",
      };
      await publisher(
        rabbitQmEnum.EXCHANGE,
        rabbitQmEnum.QUEUE_COMMENT,
        rabbitQmEnum.ROUTING_COMMENT,
        JSON.stringify(_message_comment)
      );
    } catch {}
  })();

  let comments = await Comment.find({ product: product._id })
    .limit(page * 20)
    .exec();
  let rating = await ProductRationByComments.find({
    product: product._id,
  }).exec();

  return { rating, comments };
};

module.exports = {
  commentFetcher,
  totalCommentsOnSubCategory,
};
