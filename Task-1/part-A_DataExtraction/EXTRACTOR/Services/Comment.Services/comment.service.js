let SubCategory = require("../../models/SubCategory");
let Comment = require("../../models/Comment");
let Product = require("../../models/Products");
let RatingOnProductByComments = require("../../models/ProductRationByComments");
let sellerServices = require("../../Services/seller.Services.js/seller.service");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");
let Rate = require("../../models/Rate");

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
      await productCommentExtractorByProductId(product._id);
    });
  }
}
// BY ID
const productCommentExtractorByProductId = async function (productId) {
  let commentsOnProduct = [];
  let mediaCommentsOnProduct = [];
  let ratingOnProductByComments = [];
  let pager;
  let total_pages;

  let product = await Product.findById(productId).exec();
  if (!product) console.log("No product found!");
  else {
    let request = new Request(SubRoutesEnum.PRODUCT_COMMENTS);
    let reqResults = await request.get(`${product.DK_ID}/comments/?page=1`);

    if (
      !reqResults ||
      !reqResults.data ||
      !reqResults.data.data ||
      !reqResults.data.data.pager ||
      !reqResults.data.data.pager.total_pages ||
      reqResults.data.data.pager.total_pages === 0
    ) {
      console.log(`No comment available on product: ${productId}`);
    } else {
      pager = reqResults.data.data.pager;
      total_pages = pager.total_pages;
      ratingOnProductByComments = reqResults.data.data.ratings;

      const totalComments = await Comment.countDocuments({
        product: productId,
      }).exec();
      if (totalComments !== pager.total_items) {
        console.log(`start to fetch comments for product: ${productId}`);
        await (async function loop() {
          let i = 1;
          for (i; i <= total_pages; i++) {
            let _fetchData = await request.get(
              `${product.DK_ID}/comments/?page=${i}`
            );
            commentsOnProduct = commentsOnProduct.concat(
              _fetchData.data.data.comments
            );
            mediaCommentsOnProduct = mediaCommentsOnProduct.concat(
              _fetchData.data.data.media_comments
            );
          }
        })();

        await _commentSaver(commentsOnProduct, product)
          .then((_) => {
            console.log(`Total comments fetch for product: ${product.DK_ID}`);
          })
          .catch((err) => {
            console.log(
              `error on fetching comments for product: ${product.DK_ID}`
            );
          });
      } else {
        console.log(`no new comments on product: ${product.DK_ID}`);
      }
      await _saveRatingOnProduct(ratingOnProductByComments, product)
        .then((_) => {
          console.log(
            `saved rating based on comments for product: ${product.DK_ID}`
          );
        })
        .catch((err) => console.log(err));
    }
  }
  console.log("End of total comment extraction");
};
// BY EVENT MSG

const productCommentExtractor = async function (msg) {
  let commentsOnProduct = [];
  let mediaCommentsOnProduct = [];
  let ratingOnProductByComments = [];
  let pager;
  let total_pages;

  let messageData = JSON.parse(JSON.parse(msg.content.toString()).data);
  const productId = messageData.productId;
  let product = await Product.findById(productId).exec();
  if (!product) console.log("No product found!");
  else {
    let request = new Request(SubRoutesEnum.PRODUCT_COMMENTS);
    let reqResults = await request.get(`${product.DK_ID}/comments/?page=1`);
    pager = reqResults.data.data.pager;
    if (!pager || !pager.total_pages || pager.total_pages === 0) {
      console.log(`No comment available on product: ${productId}`);
    } else {
      total_pages = pager.total_pages;
      ratingOnProductByComments = reqResults.data.data.ratings;

      const totalComments = await Comment.countDocuments({
        product: productId,
      }).exec();
      if (totalComments !== pager.total_items) {
        console.log(`start to fetch comments for product: ${productId}`);
        await (async function loop() {
          let i = 1;
          for (i; i <= total_pages; i++) {
            let _fetchData = await request.get(
              `${product.DK_ID}/comments/?page=${i}`
            );
            commentsOnProduct = commentsOnProduct.concat(
              _fetchData.data.data.comments
            );
            mediaCommentsOnProduct = mediaCommentsOnProduct.concat(
              _fetchData.data.data.media_comments
            );
          }
        })();

        await _commentSaver(commentsOnProduct, product)
          .then((_) => {
            console.log(`Total comments fetch for product: ${product.DK_ID}`);
          })
          .catch((err) => {
            console.log(
              `error on fetching comments for product: ${product.DK_ID}`
            );
          });
      } else {
        console.log(`no new comments on product: ${product.DK_ID}`);
      }
      await _saveRatingOnProduct(ratingOnProductByComments, product)
        .then((_) => {
          console.log(
            `saved rating based on comments for product: ${product.DK_ID}`
          );
        })
        .catch((err) => console.log(err));
    }
  }
};

const _commentSaver = async (fetchCommentArray, product) => {
  await fetchCommentArray.forEach(async function (comment) {
    _commentExist = await Comment.findOne({ DK_ID: comment.id }).exec();
    if (!_commentExist) {
      let newComment = await Comment({
        modify_date: Date.now(),
        DK_ID: comment.id,
        seller: await sellerServices.sellerExistence(
          comment.purchased_item.seller
        ),
        subCategory: product.subCategoryId,
        product: product._id,
        ...comment,
      });
      await newComment
        .save()
        .then((_) => {})
        .catch((err) => console.log(err));
    }
  });
};
const _saveRatingOnProduct = async (ratingArray, product) => {
  if (!ratingArray) {
    console.log(`no rating available on ${product._id} productId`);
  } else {
    let _fetchRate = await RatingOnProductByComments.findOne({
      product: product._id,
      title: product.title,
    }).exec();
    if (!_fetchRate) {
      let rates = [];
      await ratingArray.forEach(async (rate) => {
        rates = rates.concat(
          new Rate({
            id: rate.id,
            title: rate.title,
            value: rate.value,
          })
        );
      });
      let _newRate = new RatingOnProductByComments({
        modify_date: Date.now(),
        product: product._id,
        subCategory: product.subCategory,
        ratings: rates,
      });
      await _newRate.save().catch((err) => console.log(err));
    }
  }
};
module.exports = {
  productCommentExtractor,
  commentExtractor,
};
