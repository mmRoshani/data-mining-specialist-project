let express = require("express");
let router = express.Router();
let categoryServices = require("../../Services/category.Services/category.Extractor.Services");
let subCategoryExtractor = require("../../Services/category.Services/subCategoies.Service/subCategories.Extractor.Service")

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

// router.get("/main/vehicles", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("vehicles/");
//   res.json("data");
// });
//
// router.get("/main/apparel", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("apparel/");
//   res.json("data");
// });
// router.get("/main/mother-and-child", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("mother-and-child/");
//   res.json("data");
// });
//
// router.get("/main/food-beverage", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("food-beverage/");
//   res.json("data");
// });
//
// router.get("/main/personal-appliance", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("personal-appliance/");
//   res.json("data");
// });
// router.get("/main/home-and-kitchen", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("home-and-kitchen/");
//   res.json("data");
// });
// router.get("/main/rural-products", async function (req, res, next) {
//   request = new Request("https://api.digikala.com/v1/categories/");
//   data = await request.get("rural-products/");
//   res.json("data");
// });

module.exports = router;
