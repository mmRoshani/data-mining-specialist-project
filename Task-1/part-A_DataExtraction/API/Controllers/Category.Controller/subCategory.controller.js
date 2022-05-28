let express = require("express");
let commentServices = require("../../Services/comment.Services/comment.service");

let router = express.Router();
/**
 * @swagger
 * /sub_category/fetch_comments:
 *   post:
 *     summary: Retrieve a list of comments related to specific subCategory.
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
 *                       subCategory:
 *                         type: string
 *                         description: subCategory DK_ID.
 *                         example:
 *                       page:
 *                         type: number
 *                         description: 2
 *                         example: 5
 */
router.post("/fetch_comments", async function (req, res, next) {
  let data = req.body.data;
  if (!data || !data.subCategory) {
    req.json("BAD_REQUEST");
  }
  let totalCommentsOnSubCategory =
    await commentServices.totalCommentsOnSubCategory(data);
  res.json(totalCommentsOnSubCategory);
});

module.exports = router;
