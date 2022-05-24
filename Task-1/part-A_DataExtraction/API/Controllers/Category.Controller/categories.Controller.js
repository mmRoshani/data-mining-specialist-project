let express = require("express");
let router = express.Router();
let categoryServices = require("../../Services/category.Services/category.Extractor.Services");
let subCategoryExtractor = require("../../Services/category.Services/subCategoies.Service/subCategories.Extractor.Service")
let productExtractor = require("../../Services/product.Service/product.service")
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all main categories (landing-page of DK)
 *     description:
 */
router.get("/", async function (req, res, next) {
  res.json(await categoryServices.mainCategoriesExtractor());
});

/**
 * @swagger
 * /category/main:
 *   get:
 *     summary: Retrieve a list of sub category of main category.
 *     description:
 *     responses:
 *       200:
 *         description: A list of sub categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         description: Main category code. find out on /category
 *                         example: mother-and-child
 *                       page?:
 *                         type: number
 *                         description: the page number to show in nuxt.js frontend
 *                         example: 5
 */
router.post("/main", async function (req, res, next) {

  let data = req.body.data
  if(!data || !data.code){
    req.send("BAD_REQUEST")
  }
  res.json(await subCategoryExtractor.subCategoriesExtractor(data));
});
/**
 * @swagger
 * /category/fetch_products:
 *   get:
 *     summary: Retrieve a list of products related to specific sub category.
 *     description:
 *     responses:
 *       200:
 *         description: Note that this should call by pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         description: SubCategory code. find out on /category/main
 *                         example: musicalinstruments
 *                       page?:
 *                         type: number
 *                         description: the page number to show in nuxt.js frontend
 *                         example: 6
 */
router.post("/fetch_products", async function (req, res, next) {

  let data = req.body.data
  if(!data || !data.code){
    req.send("BAD_REQUEST")
  }
  res.json(await productExtractor.productExtractor(data));
});

module.exports = router;
