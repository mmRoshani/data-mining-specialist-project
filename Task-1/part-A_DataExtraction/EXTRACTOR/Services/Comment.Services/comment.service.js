let SubCategory = require("../../models/SubCategory");
let Comment = require("../../models/Comment");
let Product = require("../../models/Products");
let RatingOnProductByComments = require("../../models/ProductRationByComments");
let sellerServices = require("../../Services/seller.Services.js/seller.service");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");

async function commentExtractor(msg) {
  let messageData = JSON.parse(JSON.parse(msg.content.toString()).data);
  const subCategoryId = messageData.subCategoryId;
  const fetchedSubCategory = await SubCategory.findById(subCategoryId).exec();
  if (!fetchedSubCategory) console.log("subCategory not found");
  const products = await Product.find({
    subCategory: fetchedSubCategory._id,
  }).exec();
  if (!products) {
    console.log(
      `There must be at least one product on subCategory: ${fetchedSubCategory._id}`
    );
  } else {
    console.log(
      `Job started to fetch all ${fetchedSubCategory.code} subCategory comments`
    );
    await products.forEach(async (product) => {
      await productCommentExtractor(product._id);
    });
  }
}
const productCommentExtractor = async function (productId) {
  let commentsOnProduct = [];
  let mediaCommentsOnProduct = [];
  let ratingOnProductByComments = [];
  let product = await Product.findById(productId).exec();
  if (!product) console.log("No product found!");
  let request = new Request(SubRoutesEnum.PRODUCT_COMMENTS);
  let reqResults = await request.get(`${product.DK_ID}/comments/?page=1`);
  let pager;
  try {
    pager = reqResults.data.data.pager;
  } catch (error) {}
  if (!pager || pager.total_pages === 0) {
    console.log(`No comment available on product: ${productId}`);
  } else {
    console.log("START TO FETCHING COMMENT");
    let total_pages = pager.total_pages;

    (async function loop() {
      let i = 1;
      for (i; i <= total_pages; i++) {
        let _fetchData = await request.get(
          `${product.DK_ID}/comments/?page=${i}`
        );
        ratingOnProductByComments = _fetchData.data.data.ratings;
        commentsOnProduct = commentsOnProduct.concat(
          _fetchData.data.data.comments
        );
        mediaCommentsOnProduct = mediaCommentsOnProduct.concat(
          _fetchData.data.data.media_comments
        );
      }
    })();

    await _saveRatingOnProduct(ratingOnProductByComments, product);
    await _commentSaver(commentsOnProduct, product)
      .then((_) => {
        console.log(`Total comments fetch for product: ${product.DK_ID}`);
      })
      .catch((err) => {
        console.log(`error on fetching comments for product: ${product.DK_ID}`);
      });
  }
};

const _commentSaver = async (fetchCommentArray, subCategoryId, product) => {
  await fetchCommentArray.forEach(async function (comment) {
    _commentExist = await Comment.findOne({ DK_ID: comment.id }).exec();
    if (!_commentExist) {
      let newComment = await Comment({
        modify_date: Date.now(),
        DK_ID: comment.id,
        seller: await sellerServices.sellerExistence(
          comment.purchased_item.seller
        ),
        product: product._id,
        subCategory: product.subCategoryId,
        ...comment,
      });
      await newComment
        .save()
        .exec()
        .then((_) => console.log("COMMENT SAVED"))
        .catch((err) => console.log(err));
    }
  });
};
const _saveRatingOnProduct = async (ratingArray, product) => {
  if (!ratingArray) {
    console.log(`no rating available on ${product._id} productId`);
  } else {
    await ratingArray.forEach(async (rate) => {
      let _fetchRate = await RatingOnProductByComments.findOne({
        id: rate.id,
      }).exec();
      if (!_fetchRate) {
        let _newRate = new RatingOnProductByComments({
          modify_date: Date.now(),
          product: product._id,
          subCategory: product.subCategory,
          ...rate,
        });
        await _newRate
          .save()
          .exec()
          .catch((err) => console.log(err));
      }
    });
  }
};
module.exports = {
  commentExtractor,
  productCommentExtractor,
};
