let express = require("express");
const {
  commentFetcher,
} = require("../Services/comment.Services/comment.service");

let router = express.Router();
/**
 * @swagger
 * /product/fetch_comments:
 *   post:
 *     summary: Retrieve a list of comments related to specific product.
 *     description:
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: product DK_ID.
 *                         example:
 *                       page:
 *                         type: number
 *                         description: 2
 *                         example: 5
 */
router.post("/fetch_comments", async function (req, res, next) {
  let data = req.body.data;
  if (!data || !data.productId) {
    req.send("BAD_REQUEST");
  }
  let commentsAndProduct = await commentFetcher(data);
  res.json(commentsAndProduct);
});

router.post("/fetch_comments", async function (req, res, next) {
  let data = req.body.data;
  if (!data || !data.productId) {
    req.send("BAD_REQUEST");
  }
  let commentsAndProduct = await commentFetcher(data.productId);
  res.json(commentsAndProduct);
});

//ALL_COMMENTS
// await (async () => {
//   try {
//     const _message_product = {
//       task: "ExtractAlProductComments",
//       data: JSON.stringify({ subCategoryId: _subCategory._id }),
//       data_type: "subCategory",
//     };
//     await publisher(
//       rabbitQmEnum.EXCHANGE,
//       rabbitQmEnum.ALL_COMMENT_SUB_CATEGORY,
//       rabbitQmEnum.ROUTING_ALL_COMMENT_SUB_CATEGORY,
//       JSON.stringify(_message_product)
//     );
//   } catch {}
// })();
module.exports = router;
