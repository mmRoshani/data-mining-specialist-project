let SubCategory = require("../../models/SubCategory");
let Comment = require("../../models/Comment");
let Product = require("../../models/Products");
let sellerServices = require("../../Services/seller.Services.js/seller.service");
let Request = require("../../helpers/request");
let SubRoutesEnum = require("../../DataStructures/DK_SubRoutes.enum");

async function commentExtractor(msg) {
  let messageData = JSON.parse(JSON.parse(msg.content.toString()).data);
  let byAttribute = JSON.parse(msg.content.toString());
  console.log(byAttribute);
  if (byAttribute.by === "subCategory") {
    const subCategoryId = messageData.subCategoryId;
    const fetchedSubCategory = SubCategory.findById(subCategoryId).exec();
    if (!fetchedSubCategory) console.log("subCategory not found");
    let relatedProducts = await Product.find({ subCategory: subCategoryId });
    if (relatedProducts.length === 0)
      console.log("no related products to sub category");
    console.log(`CommentExtractionForSubCategory: ${subCategoryId}`);

    const _commentExtractor = async () => {
      await relatedProducts.forEach(async (product) => {
        let page = 1;
        let fetchedData = {};
        let fetchedComments = [];
        let fetchedMediaComments = [];
        //pager: total page and item count
        let request = new Request(SubRoutesEnum.PRODUCT_COMMENTS);
        let pager;
        try {
          reqResults = await request.get(
            `${product.DK_ID}/comments/?page=${page}`
          );
          pager = reqResults.data.data.pager;
        } catch (error) {
          console.log(error.message);
        }
        if (!pager || pager.total_items === 0) {
          console.log("No comments on subCategory products");
        } else {
          const relatedCommentCount = await Comment.countDocuments({
            subCategory: subCategoryId,
          }).exec();
          // gather all product related comments
          for (page; page <= page.total_pages; page++) {
            fetchedData = Object.assign(
              {},
              fetchedData,
              await request.get(`${product.DK_ID}/comments/?page=${page}`).data
                .data
            );
          }

          //fill comments & mediaComments
          fetchedComments = fetchedData.comments;
          fetchedMediaComments = fetchedData.media_comments;
          // save or pass product related comments
          const _commentSaver = async function () {
            await fetchedComments.forEach(async function (_comment) {
              let commentExist = await Comment.findOne({
                DK_ID: _comment.id,
              })
                .exec()
                .catch(function (err) {
                  console.log(err);
                });
              if (!commentExist) {
                let newComment = new Comment({
                  modify_date: Date.now(),
                  DK_ID: _comment.id,
                  seller: await sellerServices.sellerExistence(
                    _comment.purchased_item.seller
                  ),
                  subCategory: subCategoryId,
                  ..._comment,
                });

                await newComment.save().catch(function (err) {
                  console.log(err);
                });
              }
            });
            await fetchedMediaComments.forEach(async function (_comment) {
              let commentExist = await Comment.findOne({
                DK_ID: _comment.id,
              })
                .exec()
                .catch(function (err) {
                  console.log(err);
                });
              if (!commentExist) {
                let mediaComment = new Comment({
                  modify_date: Date.now(),
                  DK_ID: _comment.id,
                  seller: await sellerServices.sellerExistence(
                    _comment.purchased_item.seller
                  ),
                  subCategory: subCategoryId,
                  ..._comment,
                });

                await mediaComment.save().catch(function (err) {
                  console.log(err);
                });
              }
            });
          };

          if (
            pager.total_items > relatedCommentCount &&
            fetchedComments &&
            fetchedComments
          ) {
            await _commentSaver()
              .then(function (_) {})
              .catch(function (err) {
                console.log(err);
              });
          } else {
            console.log(
              "No new comments found on related subCategory product's"
            );
          }
        }
      });
    };
    await _commentExtractor()
      .then(function (_) {
        console.log(`EndExtractionOfCommentForSubCategory: ${subCategoryId}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  } else {
  }
}

module.exports = {
  commentExtractor,
};
